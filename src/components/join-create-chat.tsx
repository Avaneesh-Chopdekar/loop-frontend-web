import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function JoinCreateChat() {
	const [detail, setDetail] = useState({
		username: "",
		roomId: "",
	});

	function handleFormInputEvent(event: ChangeEvent<HTMLInputElement>) {
		setDetail((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	}

	function validate() {
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
				},
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
				},
			);
			return false;
		}
		return true;
	}

	function joinRoom() {
		if (!validate()) {
			return;
		}
		console.log(detail);
	}

	function createRoom() {
		if (!validate()) {
			return;
		}
		console.log(detail);
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
