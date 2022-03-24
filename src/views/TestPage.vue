<template>
  <h2>Тестовая страница для всяких штук</h2>
  Количество задач: {{ tasks.length }}
  <div v-for="itemTask in tasks" :key="itemTask.id">
    {{ itemTask.title }}
  </div>
  <LineChart :chartData="testData" />
  <DoughnutChart :chartData="chartTask" />
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { LineChart, DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { mapActions, mapState } from "pinia";
import { useChartStore } from "@/store/chart";
import TaskModel from "@/models/task.model";

Chart.register(...registerables);

const store = useChartStore();

export default defineComponent({
  components: { LineChart, DoughnutChart },
  created() {
    this.testChart();
    this.countTask();
  },
  data() {
    return {
      completed: [] as TaskModel[], // хз правильно ли реализовано
      active: [] as TaskModel[], // хз правильно ли реализовано
      created: [] as TaskModel[], // хз правильно ли реализовано
      testData: {
        labels: store.tasks.map((item) => item.status),
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      chartTask: {
        labels: ["Created", "Active", "Completed"],
        datasets: [
          {
            label: "My First Dataset",
            //data: [this.created, this.active, this.completed], //пофиксить ошибки связаные с length
            data: [4, 1, 1],

            backgroundColor: [
              "rgb(166,166,166)",
              "rgb(54, 162, 235)",
              "rgb(82,255,26)",
            ],
            hoverOffset: 4,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(useChartStore, {
      tasks: "tasks",
    }),
  },
  methods: {
    ...mapActions(useChartStore, {
      testChart: "chartTest",
    }),
    /**
     * Распределяет задачи по массивам
     *
     */
    countTask() {
      store.tasks.map((item) => {
        if (item.status === "completed") {
          this.completed.push(item);
        } else if (item.status === "active") {
          this.active.push(item);
        } else if (item.status === "created") {
          this.created.push(item);
        } // поменять на switch
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  width: 700px;
  margin: 0 auto;
}
.header {
  display: flex;
  justify-content: space-between;
  &__title {
    text-align: left;
  }
  &__info {
    display: flex;
  }
}
.boards {
  display: flex;
}
//components
.filter {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 20px;
  margin-right: 20px;
}
.datetime {
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px 20px;
}
//
//board
.status {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #ff0000;
  margin-right: 10px;
}
.board {
  width: 300px;
  display: block;
  margin: 60px 60px 20px 0;

  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__body {
    width: 280px;
    background: #e5e5e5;
    border-radius: 10px;
    height: auto;
    padding: 10px;
  }
  &__title {
    display: flex;
    align-items: center;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
}
/////
//task
.task {
  width: 280px;
  background: #fff;
  border-radius: 5px;
  height: auto;
  margin-bottom: 20px;
  &__container {
    width: 250px;
    margin: 0 auto;
  }
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  &__title {
    font-weight: bold;
  }
  &__option {
    color: #e5e5e5;
    font-size: 32px;
    font-weight: bold;
    cursor: pointer;
  }
  &__body {
  }
  &__description {
    margin: 25px 0;
    text-align: left;
  }
  &__footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
//
//tag

.tags {
  display: flex;
  &__button {
    cursor: pointer;
    color: #1390e5;
    border-radius: 20px;
    padding: 6px 20px;
    border: dashed 1px #1390e5;
    font-size: 14px;
  }
}
</style>
