import { defineStore } from "pinia";

import BoardModel from "@/models/board.model";
import firebase from "firebase";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as BoardModel[],
  }),
  actions: {
    /**
     * Создает новые доски и добавляет их в массив boards
     * @param boardForm - объект с данными о доске
     * */
    createBoards(boardForm: BoardModel): void {
      const saveBoard = this.boards || [];
      saveBoard.push(boardForm);
      this.addBoardsLocalStorage(saveBoard);
    },
    /**
     * Добавляет массив boards в localstorage
     * @param boards - массив boards
     * */
    addBoardsLocalStorage(boards: BoardModel[]): void {
      localStorage.setItem("saveBoard", JSON.stringify(boards));
    },
    /**
     * Получаем все доски из localstorage
     * */
    getLocalStorage(): void {
      const data: any = localStorage.getItem("saveBoard"); //поправить any!
      this.boards = JSON.parse(data);
    },
    /**
     * Обновление boards в localstorage
     */
    updateLocalStorage() {
      localStorage.setItem("saveBoard", JSON.stringify(this.boards));
    },
    async getBoardsFirebase() {
      const data = await firebase.database().ref("boards").once("value");
      try {
        const dataValue = data.val();
        console.log(dataValue);
      } finally {
        console.log("kek");
      }
    },
  },
});
