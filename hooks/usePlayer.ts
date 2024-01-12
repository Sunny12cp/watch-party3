import { socket } from "@/lib/socket-manager";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DEFAULT_VIDEO_CONFIG = {
    url: "https://www.youtube.com/watch?v=CbaNXY2sZxg&ab_channel=Poolside",
    isPlaying: false,
    volume: 0.5,
    progress: {},
    duration: 0,
    played: 0,
};

export function usePlayer() {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const [hasWindow, setHasWindow] = useState<boolean>(false);
    const [videoState, setVideoState] = useState(DEFAULT_VIDEO_CONFIG);

    useEffect(() => {
        if (typeof window !== "undefined") setHasWindow(true);
    }, []);

    const startPlaybackListener = () => setVideoState({ ...videoState, isPlaying: true });
    const pausePlaybackListener = () => setVideoState({ ...videoState, isPlaying: false });
    const videoUrlListener = (url: string) => setVideoState({ ...videoState, url });

    useEffect(() => {
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
        videoState.isPlaying ? socket?.emit("pause video", id) : socket?.emit("play video", id);
    };

    return { videoState, setVideoState, togglePlayback, roomId: id, hasWindow };
}
