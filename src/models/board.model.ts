import TaskModel from "@/models/task.model";

export default interface BoardModel {
  id: number;
  name: string;
  color: string;
  tasks: Array<TaskModel>;
}
