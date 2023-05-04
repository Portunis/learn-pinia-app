import supabase from "@/supabase/supabase";
import { useUserStore } from "@/store/user";
import IBoard from "@/typescript/interfaces/IBoard";
import { useBoardStore } from "@/store/board";
import { PostgrestError } from "@supabase/supabase-js";
/**
 * Делаем запрос для получения досок из базы данных supabase
 */
async function getBoard(): Promise<PostgrestError | undefined> {
  const storeUser = useUserStore();
  const storeBoard = useBoardStore();
  try {
    const { data: board, error } = await supabase
      .from("boards")
      .select("*")
      .eq("user_id", storeUser.user);
    console.log("Загрузил доски:", board);
    storeBoard.boards = board as Array<IBoard>;
    if (error) {
      console.log("Ошибка загрузки досок", error);
      return error;
    }
  } catch (error) {
    console.error("Error thrown get board:", error);
    storeBoard.isLoading = false;
  } finally {
    storeBoard.isLoading = false;
  }
}

/**
 * Создание доски
 * @param boardForm - {} Форма с данными: Название, цвет, id user
 */
async function createBoard(
  boardForm: IBoard
): Promise<PostgrestError | undefined> {
  try {
    const { data, error } = await supabase.from("boards").insert([boardForm]);
    if (error) {
      console.log("Ошибка создания доски", error);
      return error;
    }
    console.log("Доска создана", data);
    useBoardStore().isLoading = true;
  } catch (error) {
    console.log("Error throw create board:", error);
  } finally {
    useBoardStore().isLoading = false;
  }
}

/**
 * Удаление доски
 * @param board - {} Объект доски
 */
async function deleteBoard(board: IBoard): Promise<PostgrestError | undefined> {
  useBoardStore().isLoading = true;
  try {
    console.log("boardDelete", board.id);
    const { data, error } = await supabase
      .from("boards")
      .delete()
      .eq("id", board.id);
    if (error) {
      console.log("boardDeleteError", error);
      return error;
    }
    useBoardStore().isLoading = true;
    console.log("boardDelete", data);
  } catch (error) {
    console.error("Error thrown:", error);
  } finally {
    useBoardStore().isLoading = false;
  }
}
/**
 * Следит за изменениями в таблице boards, обновляя данные в реал.тайм
 */
function updateRealtimeBoard(): void {
  supabase
    .channel("public:boards")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "boards" },
      (payload) => {
        const boards = useBoardStore().boards;
        console.log("payloadEvent", payload.eventType);
        switch (payload.eventType) {
          case "INSERT": {
            boards.push(Object.assign(payload.new));
            break;
          }
          case "UPDATE": {
            console.log("Обновил", payload);
            break;
          }
          case "DELETE": {
            boards.forEach((item: IBoard, i: number) => {
              if (item.id === payload.old.id) {
                boards.splice(i, 1);
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
 * Отписываемся от слежки за таблицей Boards
 */
function unsubscribeBoard(): Promise<string[]> {
  return supabase.removeAllChannels();
}
export {
  getBoard,
  createBoard,
  deleteBoard,
  updateRealtimeBoard,
  unsubscribeBoard,
};
