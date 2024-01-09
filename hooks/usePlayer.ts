import { db } from "@/lib/firebase";
import { socket } from "@/lib/socket-manager";
import { doc, updateDoc } from "firebase/firestore";
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

    const syncVideoStateListener = (data: any) => setVideoState(data);
    const startPlaybackListener = () => setVideoState({ ...videoState, isPlaying: true });
    const pausePlaybackListener = () => setVideoState({ ...videoState, isPlaying: false });

    const videoUrlListener = async (url: string) => {
        try {
            setVideoState({ ...videoState, url });
            await updateDoc(doc(db, "rooms", id), { url: url });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        socket?.on("recieve video url", videoUrlListener);
        socket?.on("start video playback", startPlaybackListener);
        socket?.on("pause video playback", pausePlaybackListener);
        socket?.once("sync video state", syncVideoStateListener);

        return () => {
            socket?.off("recieve video url", videoUrlListener);
            socket?.off("start video playback", startPlaybackListener);
            socket?.off("pause video playback", pausePlaybackListener);
            socket?.on("sync video state", syncVideoStateListener);
        };
    }, [videoState]);

    const togglePlayback = () => {
        videoState.isPlaying ? socket?.emit("pause video", id) : socket?.emit("play video", id);
    };

    const syncVideoState = (socketId: string) => {
        socket?.emit("sync video state", id, videoState, socketId);
    };

    return { videoState, setVideoState, togglePlayback, roomId: id, hasWindow };
}
