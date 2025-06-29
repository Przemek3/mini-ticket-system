import { Status } from "./status.enum";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: Status;
}
