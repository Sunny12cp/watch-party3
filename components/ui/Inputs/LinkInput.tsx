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
        <>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border"
                placeholder="Paste a link to a video"
            />
            <button onClick={handleSubmit} className="bg-neutral-700 px-5">
                <img src="/icons/search.svg" alt="search" />
            </button>
        </>
    );
}

export default LinkInput;
