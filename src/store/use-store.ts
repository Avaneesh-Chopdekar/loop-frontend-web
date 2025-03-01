import { create } from "zustand";
import type { StoreType } from "../types/store-type";

export const useStore = create<StoreType>()((set) => ({
  roomId: null,
  setRoomId: (roomId: string) => set({ roomId }),
  user: null,
  setUser: (user: string) => set({ user }),
}));
