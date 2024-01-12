import { useRouter } from "next/router";
import { useState } from "react";
import { generateRoomId } from "@/utils/generate-room-id";

import { pinInputStyle } from "@/styles/custom";
import PinInput from "react-pin-input";

function RoomActionButtons() {
    const router = useRouter();
    const [showCodeInput, setShowCodeInput] = useState<boolean>(false);

    return (
        <div className="text-center font-cubano text-3xl">
            <div className="flex justify-center mt-10">
                <button
                    className="border-2 hover:border-neutral-300 border-neutral-400 py-4 px-10 text-neutral-200 mr-10"
                    onClick={() => setShowCodeInput(!showCodeInput)}
                >
                    Join Room
                </button>

                <button
                    className="bg-yellow-300 hover:bg-yellow-200 px-10 text-neutral-800 ease-in duration-150 "
                    onClick={() => router.push(`/room/${generateRoomId()}`)}
                >
                    Create Party 🎉
                </button>
            </div>

            {showCodeInput && (
                <PinInput
                    length={4}
                    type="custom"
                    onComplete={(value) => router.push(`/room/${value}`)}
                    inputStyle={{ ...pinInputStyle }}
                />
            )}
        </div>
    );
}

export default RoomActionButtons;
