import { useEffect, useRef, useState } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { SendHorizontal } from "lucide-react";
import SockJS from "sockjs-client";
import { type CompatClient, Stomp } from "@stomp/stompjs";
import { useStore } from "../store/use-store";
import { toast } from "sonner";
import RoomService from "../services/room-service";
import type { MessageRequest } from "../types/message";
import { timeAgo } from "../helper/time-ago";

export const Route = createLazyFileRoute("/chat")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { connected, roomId, user, setRoomId, setUser, setConnected } = useStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: I want to re-render the component when connected/user/roomId changes
	useEffect(() => {
		if (!connected) {
			navigate({ to: "/" });
		}
	}, [connected, roomId, user, navigate]);

	const isDevelopment = import.meta.env.MODE === "development";
	const [messages, setMessages] = useState<MessageRequest[]>([]);
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const chatBoxRef = useRef<HTMLDivElement>(null);
	const [stompClient, setStompClient] = useState<CompatClient | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (chatBoxRef.current) {
			chatBoxRef.current?.scroll({
				top: chatBoxRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	useEffect(() => {
		async function loadMessages() {
			try {
				if (!roomId) return;
				const messages = await RoomService.getMessages(roomId);
				// console.log(messages);
				setMessages(messages);
			} catch (error) {}
		}
		if (connected) {
			loadMessages();
		}
	}, [roomId, connected]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const connectWebSocket = () => {
			if (!roomId || !user) return;
			console.log("Connecting to WebSocket");
			const sock = new SockJS("http://localhost:8080/chat");
			const client = Stomp.over(sock);
			client.connect(
				{},
				() => {
					setStompClient(client);
					console.log("Connected to Room", roomId);
					toast.success(`Connected to Room ${roomId}`);
					client.subscribe(`/topic/room/${roomId}`, (message) => {
						console.log(message);
						const msg = JSON.parse(message.body);
						setMessages((prevMessages) => [...prevMessages, msg]);
					});
				},
				() => {
					toast.error(`Error connecting to Room ${roomId}`);
				},
			);
		};

		if (connected) {
			connectWebSocket();
		}
	}, [roomId]);

	const sendMessage = async () => {
		if (stompClient && connected) {
			const message = {
				sender: user,
				content: input.trim(),
				roomId: roomId,
			};

			console.log("Sending message", message);

			stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
			setInput("");
			inputRef.current?.focus();
		}

		//
	};

	function handleLogout() {
		if (!stompClient) return;
		stompClient.disconnect();
		setConnected(false);
		setRoomId("");
		setUser("");
		navigate({ to: "/" });
	}

	console.log(timeAgo("2025-03-02T17:57:52.631+00:00"));

	return (
		<main>
			<header className="fixed w-full flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
				<div>
					<h1 className="text-xl font-semibold">
						<span>{roomId}</span>
					</h1>
				</div>
				{isDevelopment ? (
					<div>
						<h1 className="text-xl font-semibold">
							User: <span>{user}</span>
						</h1>
					</div>
				) : null}
				<div>
					<button
						type="button"
						onClick={handleLogout}
						className="bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors duration-200 text-white px-6 py-2 rounded-full cursor-pointer"
					>
						Exit
					</button>
				</div>
			</header>

			<section
				ref={chatBoxRef}
				className="py-20 px-4 w-full md:w-2/3 mx-auto h-screen overflow-auto"
			>
				{messages.map((message, index) => (
					<div
						key={`${index}-${message.content}`}
						className={`flex ${message.sender === user ? "justify-end" : "justify-start"}`}
					>
						<div
							className={`mt-4 ${message.sender === user ? "bg-purple-600" : "bg-blue-600"} rounded-2xl p-2 max-w-xs`}
						>
							<div className="flex flex-row gap-2">
								<img
									src="https://avatar.iran.liara.run/public"
									alt="user avatar"
									className="h-8 w-8"
								/>
								<div className="flex flex-col gap-0.5">
									<p className="text-sm font-bold">{message.sender}</p>
									<p>{message.content}</p>
									<p className="text-xs text-gray-400">{timeAgo(message.timestamp)}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</section>

			<div className="fixed w-full md:w-2/3 mx-auto left-0 right-0 bottom-0 p-4 flex justify-center items-center gap-2">
				<input
					type="text"
					placeholder="Type a message..."
					className="w-full dark:bg-gray-600 px-4 py-2 rounded-full"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					ref={inputRef}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							sendMessage();
						}
					}}
				/>
				<button
					type="button"
					onClick={sendMessage}
					className="bg-green-700 hover:bg-green-800 active:bg-green-900 transition-colors duration-200 text-white py-2 px-6 rounded-full cursor-pointer flex justify-center items-center gap-2"
				>
					Send <SendHorizontal size={20} />
				</button>
			</div>
		</main>
	);
}
