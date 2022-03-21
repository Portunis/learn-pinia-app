export default interface TaskModels {
  id: number;
  title: string;
  description: string;
  level: string;
  idBoard: number;
  timeStart?: number;
  timeEnd?: number;
  startTask?: boolean;
  endTask?: boolean;
  complete?: boolean;
}
