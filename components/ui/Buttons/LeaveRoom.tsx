import { socket } from "@/lib/socket-manager";
import { useRouter } from "next/router";

function LeaveRoom() {
    const router = useRouter();

    const handleDisconnect = () => {
        socket?.disconnect();
        router.push("/");
    };

    return (
        <button className="bg-red-700" onClick={handleDisconnect}>
            Leave
        </button>
    );
}

export default LeaveRoom;
