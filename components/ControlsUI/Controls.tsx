import { useEffect, useState } from "react";

function Controls() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress + 0.5) % 101);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full absolute bottom-5 left-0">
            <progress className="w-full px-1" value={progress} max={100} />

            <div className="flex gap-10 mt-5 px-10">
                <img className="w-5" src="/icons/pause.svg" alt="" />
                <img className="w-8" src="/icons/volume-high.svg" alt="" />
            </div>
        </div>
    );
}

export default Controls;
