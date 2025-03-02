import { type ChangeEvent, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import RoomService from "../services/room-service";
import { useStore } from "../store/use-store";
import validate from "../helper/validate";

export default function JoinCreateChat() {
	const [detail, setDetail] = useState({
		username: "",
		roomId: "",
	});

	const { setRoomId, setUser, setConnected } = useStore();

	const navigate = useNavigate();

	function handleFormInputEvent(event: ChangeEvent<HTMLInputElement>) {
		setDetail((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	}

	async function joinRoom() {
		if (!validate(detail)) {
			return;
		}
		// console.log(detail);
		try {
			const response = await RoomService.joinRoom(detail.roomId);
			setUser(detail.username);
			setRoomId(detail.roomId);
			setConnected(true);
			navigate({ to: "/chat" });
			toast.success(`Room ${response.roomId} joined successfully`);
		} catch (error: unknown) {
			console.log(error);
			if (error instanceof Error) {
				toast.error(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(error as any).response?.data?.message || "Error joining room, try another ID",
				);
			} else {
				toast.error("Error joining room, try another ID");
			}
		}
	}

	async function createRoom() {
		if (!validate(detail)) {
			return;
		}
		// console.log(detail);
		try {
			const response = await RoomService.createRoom(detail.roomId);
			// console.log(response);
			setUser(detail.username);
			setRoomId(detail.roomId);
			setConnected(true);
			navigate({ to: "/chat" });
			toast.success(`Room ${response.roomId} created successfully`);
		} catch (error) {
			// console.log(error);
			if (error instanceof Error) {
				toast.error(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(error as any).response?.data?.message || "Error creating room, try another ID",
				);
			} else {
				toast.error("Error creating room, try another ID");
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-md p-8 rounded-md bg-gray-200 dark:bg-gray-800 flex flex-col gap-6">
				<h1 className="text-2xl font-semibold text-center">Join Room / Create Room</h1>
				<div>
					<label htmlFor="username" className="block font-medium mb-2">
						Username
					</label>
					<input
						type="text"
						name="username"
						id="username"
						placeholder="Enter your username"
						onChange={handleFormInputEvent}
						value={detail.username}
						className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded-full"
					/>
				</div>
				<div>
					<label htmlFor="roomId" className="block font-medium mb-2">
						Room ID
					</label>
					<input
						type="text"
						name="roomId"
						id="roomId"
						placeholder="Enter room ID"
						onChange={handleFormInputEvent}
						value={detail.roomId}
						className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded-full"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<button
						type="button"
						onClick={joinRoom}
						className="bg-blue-600 text-white py-2 rounded-full cursor-pointer"
					>
						Join Room
					</button>
					<button
						type="button"
						onClick={createRoom}
						className="bg-green-600 text-white py-2 rounded-full cursor-pointer"
					>
						Create Room
					</button>
				</div>
			</div>
		</div>
	);
}
