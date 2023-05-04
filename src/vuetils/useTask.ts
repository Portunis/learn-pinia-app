import supabase from "@/supabase/supabase";

import { useUserStore } from "@/store/user";
import { useTaskStore } from "@/store/task";
import ITask from "@/typescript/interfaces/ITask";
import { useBoardStore } from "@/store/board";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Делаем запрос для получения задач из базы данных supabase
 */
async function getTask(): Promise<PostgrestError | undefined> {
  console.log("запрос ушел");
  const storeUser = useUserStore();
  const storeTask = useTaskStore();
  try {
    const { data: task, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", storeUser.user);
    if (error) {
      return error;
    }
    storeTask.tasks = task as Array<ITask>;
  } catch (error) {
    console.error("Error thrown:", error);
  }
}

/**
 * Создание задачи
 * @param taskForm - {} Форма с данными задачи: имя, описание, дата окончания, id доски, id user, статус задачи
 */
async function createTask(
  taskForm: ITask
): Promise<PostgrestError | undefined> {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert([taskForm])
      .single();
    if (error) {
      return error;
    }
    console.log("createTask", data);
  } catch (error) {
    console.error("Error thrown:", error);
  }
}

/**
 * Удаление задачи
 * @param task - {} Объект задачи
 */
async function deleteTask(task: ITask): Promise<PostgrestError | undefined> {
  useBoardStore().isLoading = true;
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);
    if (error) {
      return error;
    }
    useBoardStore().isLoading = true;
  } catch (error) {
    console.error("Error thrown:", error);
  } finally {
    useBoardStore().isLoading = false;
  }
}

// /**
//  * Обновление позиции задачи в доске
//  * @param position_id
//  */
// async function updatePositionTask(
//   position_id: ITask[]
// ): Promise<PostgrestError | undefined> {
//   try {
//     console.log("typeof position_id", typeof position_id);
//     const { data, error } = await supabase
//       .from("tasks")
//       .update({ position_id: position_id.newIndex })
//       .eq("id", position_id.element.id);
//     if (error) {
//       return error;
//     }
//     console.log("data update", data);
//   } catch (error) {
//     console.error("Error thrown:", error);
//   } finally {
//     useBoardStore().isLoading = false;
//   }
// }

/**
 * Следит за изменениями в таблице tasks, обновляя данные в реал.тайм
 */
function updateRealtimeTask(): void {
  supabase
    .channel("public:tasks")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "tasks" },
      (payload) => {
        const tasks = useTaskStore().tasks;
        switch (payload.eventType) {
          case "INSERT": {
            tasks.push(Object.assign(payload.new));
            break;
          }
          case "UPDATE": {
            console.log("Обновил", payload);
            break;
          }
          case "DELETE": {
            tasks.forEach((item: ITask, i: number) => {
              if (item.id === payload.old.id) {
                tasks.splice(i, 1);
              }
            });
            break;
          }
        }
      }
    )
    .subscribe();
}

/**
 * Отписываемся от слежки за таблицей Tasks
 */
function unsubscribeTasks(): Promise<string[]> {
  return supabase.removeAllChannels();
}
export {
  getTask,
  createTask,
  //updatePositionTask,
  deleteTask,
  updateRealtimeTask,
  unsubscribeTasks,
};
