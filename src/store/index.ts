import { defineStore } from "pinia";

import TaskModels from "@/models/task.models";
import BoardModels from "@/models/board.models";

export const useStore = defineStore("main", {
  state: () => ({
    boards: [
      {
        id: 1,
        name: "task 1",
        tasks: [
          {
            title: "task1",
            description: "dasfasd",
          },
        ] as TaskModels[],
      },
    ] as BoardModels[],
  }),
  getters: {},
  actions: {
    createBoards(payload: BoardModels): void {
      const saveBoard = this.boards || [];
      saveBoard.push(payload);
    },
    createTasks(payload: TaskModels): void {
      console.log("pinia task", payload);
    },
  },
});
