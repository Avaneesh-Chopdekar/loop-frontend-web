export default function JoinCreateChat() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-md bg-gray-200 dark:bg-gray-800 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center">
          Join Room / Create Room
        </h1>
        <div>
          <label htmlFor="username" className="block font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
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
            className="w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button className="bg-blue-600 text-white py-2 rounded-full cursor-pointer">
            Join Room
          </button>
          <button className="bg-green-600 text-white py-2 rounded-full cursor-pointer">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
