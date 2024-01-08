import { socket } from "@/lib/socket-manager";
import { useEffect } from "react";

export function useSocketListener(channel: string, listener: (arg: any) => void) {
    useEffect(() => {
        socket?.on(channel, listener);

        return () => {
            socket?.off(channel, listener);
        };
    });
}
