import { io, type Socket } from "socket.io-client";

export let socket: Socket | null;

export async function initializeSocket() {
    if (socket?.connected) return;
    await fetch("/api/socket");
    socket = io();
}
