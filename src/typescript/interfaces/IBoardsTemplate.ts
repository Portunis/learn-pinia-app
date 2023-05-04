import IBoard from "@/typescript/interfaces/IBoard";

export default interface IBoardsTemplate {
  id: number;
  name: string;
  boards: Array<IBoard>;
}
