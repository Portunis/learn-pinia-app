<template>
  <h2 class="title">Task statistics</h2>
  <span class="text-warning">
    <fa class="icon" icon="warning" />
    Warning. This page is under development.
  </span>
  <div class="charts">
    <div class="chart-doughnut">
      <h3 class="chart-doughnut__title">Stats tasks</h3>
      <div class="chart-body">
        <DoughnutChart :chartData="chartTask" :options="optionsChart" />
      </div>
      <div class="chart-doughnut__footer">
        <div class="info-badge">
          <div
            class="info-badge__header"
            style="background: rgb(166, 166, 166)"
          ></div>
          <div class="info-badge__body">
            <p class="info-badge__title">Created</p>
            <p class="info-badge__description">{{ createdTasks.length }}</p>
          </div>
        </div>
        <div class="info-badge">
          <div
            class="info-badge__header"
            style="background: rgb(54, 162, 235)"
          ></div>
          <div class="info-badge__body">
            <p class="info-badge__title">Active</p>
            <p class="info-badge__description">{{ activeTasks.length }}</p>
          </div>
        </div>
        <div class="info-badge">
          <div class="info-badge__header" style="background: #ff6600"></div>
          <div class="info-badge__body">
            <p class="info-badge__title">Completed</p>
            <p class="info-badge__description">{{ completedTasks.length }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper__card">
      <h3 class="wrapper__card-title">Completed tasks for the month</h3>

      <div class="chart-line">
        <LineChart :height="230" :chartData="lineData" :options="optionsLine" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DoughnutChart, LineChart } from "vue-chart-3";

import { mapActions, mapState } from "pinia";
import { useTaskStore } from "@/store/task";
import { doughnutOptions } from "@/charts/DoughnutConfig";
import { lineChart, lineOptions, taskFilterToPush } from "@/charts/LineConfig";
import { Chart, registerables } from "chart.js";
import TaskModel from "@/models/task.model";
Chart.register(...registerables);
const store = useTaskStore();
export default defineComponent({
  name: "ChartView",
  components: { DoughnutChart, LineChart },
  data() {
    return {
      createdTasks: [] as TaskModel[],
      activeTasks: [] as TaskModel[],
      completedTasks: [] as TaskModel[],
      optionsChart: {} as Record<string, unknown>,
      optionsLine: {} as Record<string, unknown>,
      lineData: {} as Record<string, unknown>,
      taskChart: [0, 0, 0],
      chartTask: {} as Record<string, unknown>,
      chartBar: {} as Record<string, unknown>,
    };
  },
  created() {
    this.countTask();
    console.log();
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
      taskFilterToPush();
      this.optionsChart = doughnutOptions;
      this.optionsLine = lineOptions;
      this.lineData = lineChart;
      this.chartTask = {
        labels: ["Created", "Active", "Completed"],
        datasets: [
          {
            label: "Chart Info",
            data: this.taskChart,
            backgroundColor: ["#FFBB38", "#FF6600", "#8675FF"],
          },
        ],
      };
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/scss/mixins.scss";
.title {
  font-family: $poppins-font;
  text-align: center;
}
.text-warning {
  color: red;
  text-align: center;
  font-family: $poppins-font;
}
.charts {
  display: flex;
  align-items: center;
}
.chart-doughnut {
  margin: 24px 24px;
  width: 333px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background: #fff;
}
.chart-body {
  width: 162px;
  height: 162px;
  margin: 16px 0 24px 16px;
}
.chart-doughnut {
  &__title {
    @include fontTitle;
    padding-top: 16px;
    padding-left: 16px;
    letter-spacing: 0.5px;
    color: #212121;
  }
  &__footer {
    display: flex;
    justify-content: space-around;
    margin: 0 16px;
  }
}
.info-badge {
  width: 92px;
  height: 90px;
  margin-bottom: 16px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  &__header {
    background: #977df5;
    border-radius: 4px 4px 0 0;
    width: 76px;
    height: 17px;
  }
  &__body {
    @include fontTitle;
    color: #000000;
  }
  &__title {
    @include fontTitle;
    font-size: 12px;
    margin: 4px 0 4px 0;
    letter-spacing: 0.5px;
    color: #000000;
  }
  &__description {
    margin: 0;
    font-family: $poppins-font;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;
    text-align: left;
    color: #000000;
  }
}
.chart-line {
  position: relative;
  width: 900px;
}
.wrapper {
  margin: 70px 24px;
  display: grid;
  grid-column-gap: 35px;
  &__card-title {
    @include fontTitle;
    padding: 16px 16px 8px 16px;
    margin: 0;
  }
  &__card-info {
    grid-area: 1 / 1 / 3 / 2;
    width: 425px;
    height: 611px;
    background: linear-gradient(101.84deg, #5c24fc 2.78%, #9d7aff 98.95%);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
  }
  &__card {
    height: 330px;
    width: 900px;
    background: #ffffff;
    box-shadow: 0 0 16px rgb(0 0 0 / 15%);
    border-radius: 12px;
    margin: 24px;
    padding: 16px;
  }
}
.wrapper__card-chart {
  height: 361px;
}
</style>
