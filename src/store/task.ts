import { defineStore } from "pinia";
import { useStore } from "@/store/index";
import TaskModel from "@/models/task.model";

export const useTaskStore = defineStore("task", {
  actions: {
    /**
     * Создает новый task и добавляет их в массив tasks  в объекте boards, обновляет localstorage
     * @param payload - taskForm
     * */
    createTasks(payload: TaskModel): void {
      const board = useStore();
      const getBoard = board.boards.filter(
        (item) => item.id === payload.idBoard
      );
      const saveTask = getBoard[0].tasks;
      saveTask.push(payload);
      localStorage.setItem("saveBoard", JSON.stringify(board.boards));
    },
    /**
     * Удаление task из массива tasks и обновление localstorage
     * @param payload - task
     * */
    deleteTask(payload: TaskModel): void {
      const board = useStore();
      const data = board.boards.filter((item) => item.id === payload.idBoard);
      const dataTask = data[0].tasks;
      const indexTask = dataTask.indexOf(payload);
      dataTask.splice(indexTask, 1);
      board.updateLocalStorage();
    },
    /**
     * Изменение task в массиве tasks
     * @param payload -task
     * */
    editTask(payload: TaskModel): void {
      const board = useStore();
      console.log("editTask", payload);
      board.updateLocalStorage();
    },
  },
});
