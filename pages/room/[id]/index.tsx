import dynamic from "next/dynamic";
import { socket, initializeSocket } from "@/lib/socket-manager";

import { useRouter } from "next/router";
import { useEffect } from "react";
import LinkInput from "@/components/ui/Inputs/LinkInput";

import Player from "@/components/VideoPlayer/Player";
import LeaveRoom from "@/components/ui/Buttons/LeaveRoom";
// const Player = dynamic(() => import("@/components/VideoPlayer/Player"));

function RoomPage() {
    const router = useRouter();
    const { id } = router.query as { id: string };

    useEffect(() => {
        initializeSocket(id);
    }, []);

    return (
        <main>
            <LeaveRoom />
            <LinkInput />
            <Player />
        </main>
    );
}

export default RoomPage;
