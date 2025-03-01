import { createLazyFileRoute } from "@tanstack/react-router";
import JoinCreateChat from "../components/join-create-chat";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="">
			<JoinCreateChat />
		</div>
	);
}
