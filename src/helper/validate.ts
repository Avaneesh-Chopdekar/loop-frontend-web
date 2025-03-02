import { toast } from "sonner";

function validate(detail: { username: string; roomId: string }) {
  if (!detail.username) {
    toast.error("Username is required");
    return false;
  }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(detail.username)) {
    toast.error(
      "Username must be 3-20 characters long and contain only letters, numbers, and underscores",
      {
        closeButton: true,
        duration: 8000,
      }
    );
    return false;
  }
  if (!detail.roomId) {
    toast.error("Room ID is required");
    return false;
  }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(detail.roomId)) {
    toast.error(
      "Room ID must be 3-20 characters long and contain only letters, numbers, and underscores",
      {
        closeButton: true,
        duration: 8000,
      }
    );
    return false;
  }
  return true;
}

export default validate;
