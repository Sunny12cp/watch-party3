import { socket } from "@/lib/socket-manager";
import { useRouter } from "next/router";
import { useState } from "react";

function LinkInput() {
    const router = useRouter();
    const [input, setInput] = useState<string>("");

    const handleSubmit = () => {
        socket?.emit("change video url", input, router.query.id);
        setInput("");
    };

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="text-neutral-200 w-64 rounded-sm px-4 py-1 bg-neutral-800 mr-3"
                placeholder="Paste a link to a video"
            />
            <button onClick={handleSubmit} className="bg-neutral-800 py-2 px-2.5 rounded-sm">
                <img src="/icons/search.svg" alt="search" />
            </button>
        </div>
    );
}

export default LinkInput;
