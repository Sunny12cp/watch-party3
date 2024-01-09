import { playerStyle } from "@/styles/custom";
import { usePlayer } from "@/hooks/usePlayer";
import Controls from "./Controls";
import { socket } from "@/lib/socket-manager";
import { useRef } from "react";
import ReactPlayer from "react-player/lazy";

function Player() {
    const ref = useRef<ReactPlayer>(null);
    const { videoState, setVideoState, togglePlayback, roomId, hasWindow } = usePlayer();

    return (
        <div className="relative block w-fit mx-auto mt-16">
            <Controls
                roomId={roomId}
                state={videoState}
                setState={setVideoState}
                togglePlayback={togglePlayback}
                videoPlayerRef={ref}
            />
            {hasWindow && (
                <ReactPlayer
                    ref={ref}
                    width={1200}
                    height={675}
                    url={videoState.url}
                    playing={videoState.isPlaying}
                    onPlay={() => socket?.emit("play video", roomId)}
                    onPause={() => socket?.emit("pause video", roomId)}
                    onProgress={(state) => setVideoState({ ...videoState, progress: state })}
                    onDuration={(duration) => setVideoState({ ...videoState, duration })}
                    volume={videoState.volume}
                    style={{ ...playerStyle }}
                />
            )}
        </div>
    );
}

export default Player;
