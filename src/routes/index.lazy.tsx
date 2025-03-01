import { createLazyFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3 className="text-3xl font-bold">Welcome Home!</h3>
      <button
        onClick={() => {
          toast.success("Hello from Loop!");
        }}
        className="bg-blue-500 text-white p-2 rounded mt-2 cursor-pointer"
      >
        Click me!
      </button>
    </div>
  );
}
