import { httpClient } from "../config/http-client";
import type { Room } from "../types/room";

const RoomService = {
  createRoom: async (roomDetail: string): Promise<Room> => {
    const response = await httpClient.post<Room>("/room", roomDetail);
    return response.data;
  },
};

export default RoomService;
