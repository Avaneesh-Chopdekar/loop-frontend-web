import type { BaseType } from "./base-type";
import type { Message } from "./message";

export type Room = BaseType & {
  name: string;
  users: string[];
  messages: Message[];
};
