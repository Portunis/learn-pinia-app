import BoardModel from "@/models/board.model";

export default interface BoardsTemplateModel {
  id: number;
  name: string;
  boards: Array<BoardModel>;
}
