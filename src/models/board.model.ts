import TaskModel from "@/models/task.model";

export default interface BoardModel {
  id: number;
  name: string;
  tasks: Array<TaskModel>;
}
