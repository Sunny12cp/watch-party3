import { io, type Socket } from "socket.io-client";

export let socket: Socket | null;

export async function initializeSocket() {
    await fetch("/api/socket");
    socket = io();
}
