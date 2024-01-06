import { useRouter } from "next/router";
import { generateRoomId } from "@/utils/generate-room-id";

function RoomActionButtons() {
    const router = useRouter();

    const handleCreateNewRoom = () => {
        router.push(`/room/${generateRoomId()}`);
    };

    const handleJoinRoom = () => {};

    return (
        <div className="text-center">
            <button className="border border-black rounded-md p-5 bg-neutral-200" onClick={handleJoinRoom}>
                Join Room
            </button>
            <button className="border border-black rounded-md p-5" onClick={handleCreateNewRoom}>
                Create Party
            </button>
        </div>
    );
}

export default RoomActionButtons;
