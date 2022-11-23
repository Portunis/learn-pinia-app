export default interface AwardsModel {
  uid: string;
  achievements: Array<Awards>;
}
interface Awards {
  id: number;
  name: string;
  count: number;
  color: string;
}
