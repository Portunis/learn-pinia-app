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
    },
    createTasks(payload: TaskModels): void {
      const getBoard = this.boards.filter(
        (item) => item.id === payload.idBoard
      );
      const saveTask = getBoard[0].tasks || [];
      saveTask.push(payload);
    },
  },
});
