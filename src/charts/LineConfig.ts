import "../assets/variables.scss";
import { useTaskStore } from "@/store/task";
import ITask from "@/typescript/interfaces/ITask";

const store = useTaskStore();

const TASK_CREATE = [] as ITask[];
const TASK_ACTIVE = [] as ITask[];
const TASK_COMPLETED = [] as ITask[];

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
const PreviousMonth = new Date(date.setMonth(date.getMonth()));

let days: any = new Date(
  PreviousMonth.getFullYear(),
  PreviousMonth.getMonth() + 1,
  0
).getDate();

const testTask: any = [
  { x: 24, y: 1 },
  { x: 25, y: 5 },
];
const SortingTasksByDate = () => {
  const sortedTasks: ITask[] = [];
  store.tasks.map((task: ITask) => {
    if (task.time_end) {
      sortedTasks.push(task);
    }
  });
  testTask.sort(byField("x"));
  testTask.forEach((item: { x: number; y: number }) => item.x);
  console.log("testTask", testTask);
  console.log("sortedTask", sortedTasks);
  console.log("tasks", sortedTasks);
};
//TODO Переписать функцию порядка значений в массиве для отрисовки графика
function byField(field: string) {
  return (a: any, b: any) => (a[field] > b[field] ? 1 : -1);
}
SortingTasksByDate();

const taskFilteredDate = [
  {
    x: 1,
    y: 4,
  },
  {
    x: 3,
    y: 7,
  },
];
const lineChart = {
  labels: (days = Array.from({ length: days }, (_, i) => i + 1)),
  datasets: [
    {
      label: "Выполнено",
      data: taskFilteredDate,
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
/*
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
  */
