import { useSocketListener } from "@/hooks/useSocketListener";
import { socket } from "@/lib/socket-manager";
import { formatTime } from "@/utils/format-time";
import { useState } from "react";

function Controls({ state, setState, togglePlayback, videoPlayerRef, roomId }: any) {
    const [showControls, setShowControls] = useState<boolean>(false);
    useSocketListener("update video time", (time) => videoPlayerRef.current.seekTo(time));

    const onSeekMouseUpHandler = () => {
        videoPlayerRef.current.seekTo(state.played);
        socket?.emit("seek video", state.played, roomId);
    };

    if (!state.duration) return null;

    return (
        <div
            className="absolute z-10 bottom-0 w-full controls py-3 rounded-b-lg transition-opacity duration-500"
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            style={{ opacity: showControls ? 1 : 0 }}
        >
            <input
                className="w-full mb-3"
                type="range"
                min={0}
                max={state.duration}
                value={state.progress?.playedSeconds}
                onChange={(e) => setState({ ...state, played: e.target.valueAsNumber })}
                onMouseUp={onSeekMouseUpHandler}
            />

            <div className="flex items-center">
                <button onClick={() => togglePlayback()}>
                    <img
                        className="w-4 mx-8"
                        src={state.isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
                        alt="play-pause"
                    />
                </button>

                <div className="flex mr-5">
                    <img className="w-7" src="/icons/volume-high.svg" alt="volume" />
                    <input
                        className="w-20 ml-5"
                        type="range"
                        min={0}
                        max={1}
                        value={state.volume}
                        onChange={(e) => setState({ ...state, volume: e.target.valueAsNumber })}
                        step="0.05"
                    />
                </div>

                <p className="text-xl text-white font-medium">
                    {formatTime(state.duration - state.progress?.playedSeconds)}
                </p>
            </div>
        </div>
    );
}

export default Controls;
