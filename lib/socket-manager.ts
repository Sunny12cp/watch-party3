import { io, type Socket } from "socket.io-client";

export let socket: Socket | null;

export async function initializeSocket(room_id: string) {
    if (socket?.connected) return;
    await fetch("/api/socket");
    socket = io();
    socket?.emit("join room", room_id);
}
