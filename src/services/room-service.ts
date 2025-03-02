import { httpClient } from "../config/http-client";
import type { Room } from "../types/room";

const RoomService = {
  createRoom: async (roomDetail: string): Promise<Room> => {
    const response = await httpClient.post<Room>("/room", roomDetail, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  },

  joinRoom: async (roomId: string): Promise<Room> => {
    const response = await httpClient.get<Room>(`/room/${roomId}`);
    return response.data;
  },

  getMessages: async (roomId: string, size = 50, page = 0) => {
    const response = await httpClient.get(
      `/room/${roomId}/messages?size=${size}&page=${page}`
    );
    return response.data;
  },
};

export default RoomService;
