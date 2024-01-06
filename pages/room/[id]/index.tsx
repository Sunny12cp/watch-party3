import Player from "@/components/VideoPlayer/Player";
import { socket, initializeSocket } from "@/lib/socket-manager";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function RoomPage() {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const [input, setInput] = useState<string>("");

    useEffect(() => {
        initializeSocket();
        socket?.emit("joinRoom", id);

        return () => {
            socket?.disconnect();
        };
    }, []);

    const handleSubmit = () => {
        socket?.emit("changeVideoUrl", input);
        setInput("");
    };

    return (
        <main>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border"
                placeholder="Enter video url"
            />
            <button onClick={handleSubmit} className="bg-neutral-700 px-5">
                Go
            </button>
            <Player />
        </main>
    );
}

export default RoomPage;
