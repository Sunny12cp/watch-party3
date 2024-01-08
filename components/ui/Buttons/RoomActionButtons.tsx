import { useRouter } from "next/router";
import { pinInputStyle } from "@/styles/custom";
import PinInput from "react-pin-input";
import Modal from "../Modal/Modal";
import { useState } from "react";

function RoomActionButtons() {
    const router = useRouter();
    const [showRoomCodeModal, setShowRoomCodeModal] = useState<boolean>(false);

    const createNewRoom = async () => {
        const response = await fetch("/api/create-room");
        const { id } = await response.json();
        router.push(`/room/${id}`);
    };

    const joinRoom = async (id: string) => {
        const response = await fetch("/api/join-room", {
            method: "POST",
            body: JSON.stringify(id),
        });

        const { isRoomAvailable } = await response.json();

        if (!isRoomAvailable) {
            alert(`Room ${id} is not available`);
            return;
        }
        router.push(`/room/${id}`);
    };

    return (
        <div className="text-center">
            <PinInput
                length={4}
                type="custom"
                onComplete={(value) => joinRoom(value)}
                inputStyle={{ ...pinInputStyle }}
            />

            <button
                className="border border-black rounded-md p-5 bg-neutral-200"
                onClick={() => setShowRoomCodeModal(true)}
            >
                Join Room
            </button>

            <button className="border border-black rounded-md p-5" onClick={createNewRoom}>
                Create Party
            </button>
        </div>
    );
}

export default RoomActionButtons;
