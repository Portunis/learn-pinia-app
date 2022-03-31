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
  created_at?: number;
  endTask: string;
  timer: number;
}
