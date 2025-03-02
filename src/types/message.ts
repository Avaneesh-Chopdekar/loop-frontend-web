import type { BaseType } from "./base-type";

export type MessageRequest = {
  sender: string;
  content: string;
  roomId: string;
  timeStamp: string;
};

export type Message = MessageRequest & BaseType;
