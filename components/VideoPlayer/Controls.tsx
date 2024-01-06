import { formatTime } from "@/utils/format-time";
import { useState } from "react";

function Controls({ state, setState, togglePlayback }: any) {
    const [showControls, setShowControls] = useState<boolean>(true);
    const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(true);

    if (!state.duration) {
        return null;
    }

    // const seekHandler = (value) => {
    //     setState({ ...state, played: parseFloat(value) / 100 });
    // };

    // const seekMouseUpHandler = (value) => {
    //     setState({ ...state, seeking: false });
    //     ref.current.seekTo(value / 100);
    // };

    return (
        <div
            className="absolute z-10 bottom-0 w-full flex items-center controls py-5 rounded-b-lg transition-opacity duration-500"
            onMouseMove={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            style={{ opacity: showControls ? 1 : 1 }}
        >
            <button onClick={() => togglePlayback()}>
                <img
                    className="w-5 mx-10"
                    src={state.isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
                    alt="play-pause"
                />
            </button>

            <div className="w-8 mr-10 block relative cursor-pointer" onClick={() => setShowVolumeSlider(true)}>
                <img className="w-full" src="/icons/volume-high.svg" alt="volume" />

                {showVolumeSlider && (
                    <input
                        onMouseLeave={() => setShowVolumeSlider(false)}
                        className="-rotate-90 absolute bottom-7 w-20 left-3"
                        type="range"
                        min={0}
                        max={1}
                        value={state.volume}
                        onChange={(e) => setState({ ...state, volume: e.target.valueAsNumber })}
                        step="0.05"
                    />
                )}
            </div>

            <input
                className="w-96 ml-5 mr-10"
                type="range"
                min={0}
                max={state.duration}
                value={state.progress?.playedSeconds}
            />

            <p className="text-xl text-white">{formatTime(state.duration - state.progress?.playedSeconds)}</p>
        </div>
    );
}

export default Controls;
