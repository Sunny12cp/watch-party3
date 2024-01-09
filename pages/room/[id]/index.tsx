import { socket, initializeSocket } from "@/lib/socket-manager";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Player from "@/components/VideoPlayer/Player";
import Nav from "@/components/Nav/Nav";

function RoomPage() {
    const router = useRouter();

    useEffect(() => {
        const initialize = async () => {
            await initializeSocket();
            socket?.emit("join room", router.query.id);
        };
        initialize();

        return () => {
            socket?.disconnect();
        };
    }, []);

    return (
        <main className="bg-neutral-900 h-screen">
            <Nav />
            <Player />
        </main>
    );
}

export default RoomPage;
