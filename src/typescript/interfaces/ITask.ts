export default interface ITask {
  id: number;
  title: string;
  description: string;
  level: string | null;
  board_id: string;
  time_start?: string | null;
  time_end?: string | null;
  status: string | null;
  created_at?: string | null;
  end_task: string | null;
  timer: string | null;
  user_id: string;
  position_id?: number;
}
