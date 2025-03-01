import { createLazyFileRoute } from "@tanstack/react-router";
import { SendHorizontal } from "lucide-react";
import { useRef, useState } from "react";
import type { MessageRequest } from "../types/message";

export const Route = createLazyFileRoute("/chat")({
	component: RouteComponent,
});

function RouteComponent() {
	const isDevelopment = import.meta.env.MODE === "development";
	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const chatBoxRef = useRef<HTMLDivElement>(null);
	const [stompClient, setStompClient] = useState(null);
	const [roomId, setRoomId] = useState("secret-room");
	const [user, setUser] = useState("Avaneesh");
	const [messages, setMessages] = useState<MessageRequest[]>([
		{
			sender: "Jethalal",
			content: "Hello World",
			roomId,
		},
		{
			sender: "Avaneesh",
			content: "Hello World",
			roomId,
		},
		{
			sender: "Popatlal",
			content: "Hello World",
			roomId,
		},
		{
			sender: "Bhide",
			content: "Hello World",
			roomId,
		},
	]);

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
						className="bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors duration-200 text-white px-6 py-2 rounded-full cursor-pointer"
					>
						Exit
					</button>
				</div>
			</header>

			<section className="py-20 px-4 w-full md:w-2/3 mx-auto h-screen overflow-auto">
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
				/>
				<button
					type="button"
					className="bg-green-700 hover:bg-green-800 active:bg-green-900 transition-colors duration-200 text-white py-2 px-6 rounded-full cursor-pointer flex justify-center items-center gap-2"
				>
					Send <SendHorizontal size={20} />
				</button>
			</div>
		</main>
	);
}
