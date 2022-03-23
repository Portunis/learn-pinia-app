import Tag from "@/models/tag.model";

export default interface TaskModel {
  id: number;
  title: string;
  description: string;
  level: string;
  idBoard: number;
  timeStart?: number;
  timeEnd?: number;
  status: string;
  tags?: Array<Tag>;
}
