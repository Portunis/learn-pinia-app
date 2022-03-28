<template>
  <div class="charts">
    <h2>Статистика задач</h2>
    <div>
      <h3>Всего задач: {{ tasks.length }}</h3>
    </div>
    <div class="charts">
      <DoughnutChart :chartData="chartTask" />
      <BarChart :chartData="chartBar" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { DoughnutChart, BarChart } from "vue-chart-3";
import TaskModel from "@/models/task.model";

import { mapActions, mapState } from "pinia";
import { useTaskStore } from "@/store/task";

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const store = useTaskStore();

export default defineComponent({
  name: "ChartView",
  components: { DoughnutChart, BarChart },

  data() {
    return {
      completedTasks: [] as TaskModel[], // хз правильно ли реализовано
      activeTasks: [] as TaskModel[], // хз правильно ли реализовано
      createdTasks: [] as TaskModel[], // хз правильно ли реализовано
      taskChart: [0, 0, 0],
      chartTask: {} as Record<string, unknown>,
      chartBar: {} as Record<string, unknown>,
    };
  },
  created() {
    this.countTask();

    this.taskChart = [
      this.createdTasks.length,
      this.activeTasks.length,
      this.completedTasks.length,
    ];
    this.initChart();
  },
  computed: {
    ...mapState(useTaskStore, {
      tasks: "tasks",
    }),
  },
  methods: {
    ...mapActions(useTaskStore, {
      testChart: "initTask",
    }),
    /**
     * Распределяет задачи по массивам
     *
     */
    countTask(): void {
      store.tasks.map((item) => {
        switch (item.status) {
          case "completed":
            this.completedTasks.push(item);
            break;
          case "active":
            this.activeTasks.push(item);
            break;
          case "created":
            this.createdTasks.push(item);
            break;
        }
      });
    },
    initChart(): void {
      this.chartTask = {
        labels: ["Created", "Active", "Completed"],
        datasets: [
          {
            label: "Chart Info",

            data: this.taskChart,

            backgroundColor: [
              "rgb(166,166,166)",
              "rgb(54, 162, 235)",
              "rgb(82,255,26)",
            ],
            hoverOffset: 6,
          },
        ],
      };
      this.chartBar = {
        labels: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь",
        ],
        datasets: [
          {
            label: "Выполнено задач",
            data: [65, 59, 80, 81, 56, 55, 40, 50, 60, 30, 20],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
              "rgb(62,108,201, 0.2)",
              "rgb(182,64,182, 0.2)",
              "rgb(58,187,79,0.2)",
              "rgb(239,212,163, 0.2)",
              "rgb(241,66,66,0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
              "rgb(62,108,201)",
              "rgb(182,64,182)",
              "rgb(58,187,79)",
              "rgb(239,212,163)",
              "rgb(241,66,66)",
            ],
            borderWidth: 2,
          },
        ],
      };
    },
  },
});
</script>
<style lang="scss" scoped></style>
