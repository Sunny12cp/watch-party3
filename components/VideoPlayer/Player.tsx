import dynamic from "next/dynamic";

import { playerStyle } from "@/styles/video-player-style";
import { useRef } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import Controls from "./Controls";
import { socket } from "@/lib/socket-manager";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

function Player() {
    const playerRef = useRef<any>();
    const { videoState, setVideoState, togglePlayback } = usePlayer();

    return (
        <div className="relative block w-fit">
            <Controls state={videoState} setState={setVideoState} togglePlayback={togglePlayback} />

            <ReactPlayer
                ref={playerRef}
                width={890}
                height={500}
                url={videoState.url}
                playing={videoState.isPlaying}
                onPlay={() => socket?.emit("playVideo")}
                onPause={() => socket?.emit("pauseVideo")}
                onProgress={(state) => setVideoState({ ...videoState, progress: state })}
                onDuration={(duration) => setVideoState({ ...videoState, duration })}
                volume={videoState.volume}
                style={{ ...playerStyle }}
            />
        </div>
    );
}

export default Player;
