import { defineStore } from "pinia";

import IBoard from "@/typescript/interfaces/IBoard";
import IBoardsTemplate from "@/typescript/interfaces/IBoardsTemplate";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [] as IBoard[],
    boardsTemplate: [] as IBoardsTemplate[],
    isLoading: false as boolean,
  }),
});
