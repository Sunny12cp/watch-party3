import { socket } from "@/lib/socket-manager";
import { useRouter } from "next/router";

function LeaveRoomButton() {
    const router = useRouter();

    const handleDisconnect = () => {
        socket?.emit("leave", router.query.id);
        router.push("/");
    };

    return (
        <button
            className="bg-red-800 rounded-sm px-4 py-1 text-neutral-200 flex items-center gap-2 hover:bg-red-700 ease-in duration-150"
            onClick={handleDisconnect}
        >
            Leave
            <img src="/icons/leave.svg" alt="leave" />
        </button>
    );
}

export default LeaveRoomButton;
