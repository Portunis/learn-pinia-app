import { defineStore } from "pinia";

import { useStore } from "@/store/index";
import TaskModel from "@/models/task.model";

export const useChartStore = defineStore("chart", {
  state: () => ({
    tasks: [] as TaskModel[],
  }),
  actions: {
    /**
     * Вытаскивает задачи из всех досок
     */
    chartTest() {
      const board = useStore();
      const boards = board.boards;

      const tasks = boards.map((item) => {
        return item.tasks.map((item) => {
          return item;
        });
      });
      const test = tasks.flat();
      this.tasks = test;
      console.log(test);
      console.log("sosi");
    },
  },
});
