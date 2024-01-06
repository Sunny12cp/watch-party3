import { socket } from "@/lib/socket-manager";
import { useRouter } from "next/router";
import { useState } from "react";

export function usePlayer() {
    const [videoState, setVideoState] = useState({
        url: "",
        isPlaying: false,
        volume: 0.5,
        progress: {},
        duration: 0,
    });

    socket?.on("receiveVideoUrlChange", (data) => setVideoState({ ...videoState, url: data }));

    const togglePlayback = () => {
        videoState.isPlaying ? socket?.emit("pauseVideo") : socket?.emit("playVideo");
    };

    socket?.on("startVideoPlayback", () => setVideoState({ ...videoState, isPlaying: true }));
    socket?.on("pauseVideoPlayback", () => setVideoState({ ...videoState, isPlaying: false }));

    return { videoState, setVideoState, togglePlayback };
}
