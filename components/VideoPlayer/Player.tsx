import { playerStyle } from "@/styles/custom";
import { usePlayer } from "@/hooks/usePlayer";
import Controls from "./Controls";
import { socket } from "@/lib/socket-manager";
import { useRef } from "react";
import ReactPlayer from "react-player/lazy";

function Player() {
    const ref = useRef<ReactPlayer>(null);
    const { videoState, setVideoState, togglePlayback, room } = usePlayer();

    return (
        <div className="relative block w-fit">
            <Controls
                room={room}
                state={videoState}
                setState={setVideoState}
                togglePlayback={togglePlayback}
                videoPlayerRef={ref}
            />
            <ReactPlayer
                ref={ref}
                width={890}
                height={500}
                url={videoState.url}
                playing={videoState.isPlaying}
                onPlay={() => socket?.emit("play video", room)}
                onPause={() => socket?.emit("pause video", room)}
                onProgress={(state) => setVideoState({ ...videoState, progress: state })}
                onDuration={(duration) => setVideoState({ ...videoState, duration })}
                volume={videoState.volume}
                style={{ ...playerStyle }}
            />
        </div>
    );
}

export default Player;
