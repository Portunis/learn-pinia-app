import Tag from "@/models/tag.model";

export default class TaskTASK {
  id: number;
  title: string;
  description: string;
  idBoard: number;
  status: string;
  endTask: string;
  timer: number;
  timeStart?: number;
  timeEnd?: number;
  tags?: Array<Tag>;
  created_at?: number;
  level?: string;

  constructor(
    id: number,
    title: string,
    description: string,
    idBoard: number,
    status: string,
    endTask: string,
    timer: number,
    timeStart?: number,
    timeEnd?: number,
    tags?: Array<Tag>,
    created_at?: number,
    level?: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.level = level;
    this.idBoard = idBoard;
    this.status = status;
    this.endTask = endTask;
    this.timer = timer;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.tags = tags;
    this.created_at = created_at;
  }

  testFn() {
    console.log(1);
  }
}
