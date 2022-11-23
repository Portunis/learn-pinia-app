import "../assets/variables.scss";
import { useTaskStore } from "@/store/task";
import TaskModel from "@/models/task.model";

const store = useTaskStore();

const TASK_CREATE = [] as TaskModel[];
const TASK_ACTIVE = [] as TaskModel[];
const TASK_COMPLETED = [] as TaskModel[];

const taskFilterToPush = () => {
  store.tasks.map((item) => {
    switch (item.status) {
      case "completed":
        TASK_COMPLETED.push(item);
        break;
      case "active":
        TASK_ACTIVE.push(item);
        break;
      case "created":
        TASK_CREATE.push(item);
        break;
    }
  });
  console.log("Я заполнил данные");
  console.log("Active", TASK_ACTIVE);
  console.log("Complete", TASK_COMPLETED);
  console.log("Created", TASK_CREATE);
};

const lineOptions = {
  animation: {
    animationRotate: true,
    duration: 2000,
  },
  tooltips: {
    display: false,
  },
  cutoutPercentage: 70,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 20,
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
    },
    x: {
      grid: {
        display: true,
      },
      ticks: {
        fontFamily: "Poppins",
        color: ["#C9C9C9"],
        size: 12,
        textAlign: "center",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      fullSize: false,
      position: "bottom",
      maxWidth: 100,
      labels: {
        usePointStyle: true,
        font: {
          family: "Poppins",
          size: 12,
        },
        padding: 16,
        color: ["#C9C9C9"],
      },
    },
  },
};

const date = new Date(Date.now());
const PreviosMonth = new Date(date.setMonth(date.getMonth()));

let days: any = new Date(
  PreviosMonth.getFullYear(),
  PreviosMonth.getMonth() + 1,
  0
).getDate();

const lineChart = {
  labels: (days = Array.from({ length: days }, (_, i) => i + 1)),
  datasets: [
    {
      label: "Выполнено",
      data: [
        "1",
        "2",
        "3",
        "5",
        "2",
        "7",
        "10",
        "5",
        "11",
        "18",
        "12",
        "15",
        "5",
        "9",
        "19",
        "13",
        "1",
        "2",
        "3",
        "5",
        "2",
        "7",
        "10",
        "10",
        "10",
        "10",
        "10",
        "5",
      ],
      borderJoinStyle: "bevel",
      backgroundColor: ["#FF6600"],
      borderColor: ["#FF6600"],
      pointRadius: 2,
      lineTension: 0.5,
    },
  ],
};

export {
  lineChart,
  lineOptions,
  taskFilterToPush,
  TASK_COMPLETED,
  TASK_CREATE,
  TASK_ACTIVE,
};
