import { defineStore } from "pinia";

import BoardModel from "@/models/board.model";

export const useStore = defineStore("main", {
  state: () => ({
    boards: [] as BoardModel[],
  }),
  actions: {
    /**
     * Создает новые board и добавляет их в массив boards
     * @param payload - boardForm
     * */
    createBoards(payload: BoardModel): void {
      const saveBoard = this.boards || [];
      saveBoard.push(payload);
      this.addBoardsLocalStorage(saveBoard);
    },
    /**
     * Добавляет boards в localstorage
     * @param payload - boards
     * */
    addBoardsLocalStorage(payload: BoardModel[]): void {
      localStorage.setItem("saveBoard", JSON.stringify(payload));
      this.getLocalStorage();
    },
    /**
     * Получаем boards из localstorage
     * */
    getLocalStorage(): void {
      const data: any = localStorage.getItem("saveBoard"); //поправить any!
      this.boards = JSON.parse(data);
    },
    /**
     * Обновление boards в localstorage
     * */
    updateLocalStorage() {
      localStorage.setItem("saveBoard", JSON.stringify(this.boards));
    },
  },
});
