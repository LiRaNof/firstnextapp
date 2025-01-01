import { DateTime } from "luxon";

export default interface Data {
  todo: string;
  due: DateTime;
  rank:number;
}
