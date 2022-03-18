import TaskModels from "@/models/task.models";

export default interface BoardModels {
  id: number;
  name: string;
  tasks: Array<TaskModels>;
}
