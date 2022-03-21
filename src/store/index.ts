import { defineStore } from "pinia";

import TaskModels from "@/models/task.models";
import BoardModels from "@/models/board.models";

export const useStore = defineStore("main", {
  state: () => ({
    boards: [] as BoardModels[],
  }),
  getters: {},
  actions: {
    createBoards(payload: BoardModels): void {
      const saveBoard = this.boards || [];
      saveBoard.push(payload);
      this.addBoardsLocalStorage(saveBoard);
      console.log("board", saveBoard);
    },
    addBoardsLocalStorage(payload: BoardModels[]): void {
      console.log("local", payload);
      localStorage.setItem("saveBoard", JSON.stringify(payload));
      this.getLocalStorage();
    },
    createTasks(payload: TaskModels): void {
      const getBoard = this.boards.filter(
        (item) => item.id === payload.idBoard
      );
      const saveTask = getBoard[0].tasks || [];
      saveTask.push(payload);
      localStorage.setItem("saveBoard", JSON.stringify(this.boards));
    },
    getLocalStorage() {
      const data: any = localStorage.getItem("saveBoard"); //поправить any

      this.boards = JSON.parse(data);
      console.log("localStorage", this.boards);
    },
    updateLocalStorage() {
      localStorage.setItem("saveBoard", JSON.stringify(this.boards));
    },
    deleteTask(payload: TaskModels): void {
      const data = this.boards.filter((item) => item.id === payload.idBoard);

      const dataTask = data[0].tasks || [];

      const indexTask = dataTask.indexOf(payload);
      dataTask.splice(indexTask, 1);
      this.updateLocalStorage();
    },
    editTask(payload: TaskModels): void {
      const data = this.boards.filter((item) => item.id === payload.idBoard);

      const dataTask = data[0].tasks || [];
      console.log("dataTask", dataTask);
      this.updateLocalStorage();
    },
  },
});
