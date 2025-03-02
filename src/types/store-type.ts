export type StoreType = {
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  user: string | null;
  setUser: (user: string) => void;
  connected: boolean;
  setConnected: (connected: boolean) => void;
};
