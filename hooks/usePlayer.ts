import { socket } from "@/lib/socket-manager";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function usePlayer() {
    const router = useRouter();

    const [videoState, setVideoState] = useState({
        url: "https://www.youtube.com/watch?v=8rNMP0k6o0o&ab_channel=CovenantOPC",
        isPlaying: false,
        volume: 0.5,
        progress: {},
        duration: 0,
        played: 0,
    });

    useEffect(() => {
        const videoUrlListener = (data: any) => setVideoState({ ...videoState, url: data });
        const startPlaybackListener = () => setVideoState({ ...videoState, isPlaying: true });
        const pausePlaybackListener = () => setVideoState({ ...videoState, isPlaying: false });

        socket?.on("recieve video url", videoUrlListener);
        socket?.on("start video playback", startPlaybackListener);
        socket?.on("pause video playback", pausePlaybackListener);

        return () => {
            socket?.off("recieve video url", videoUrlListener);
            socket?.off("start video playback", startPlaybackListener);
            socket?.off("pause video playback", pausePlaybackListener);
        };
    }, [videoState]);

    const togglePlayback = () => {
        videoState.isPlaying
            ? socket?.emit("pause video", router.query.id)
            : socket?.emit("play video", router.query.id);
    };

    return { videoState, setVideoState, togglePlayback, room: router.query.id };
}
