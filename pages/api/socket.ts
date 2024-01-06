import { Server } from "socket.io";

export default function handler(req: any, res: any) {
    //Server already setup
    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
        socket.on("joinRoom", (id: string) => {
            if (socket.rooms.has(id)) {
                socket.join(id);
            } else {
                return `Room ${id} does not exist`;
            }
        });

        socket.on("createRoom", (id: string) => {
            socket.join(id);
        });

        socket.on("disconnect", () => {});

        socket.on("changeVideoUrl", (url: string) => {
            io.emit("receiveVideoUrlChange", url);
        });

        socket.on("playVideo", () => {
            io.emit("startVideoPlayback");
        });

        socket.on("pauseVideo", () => {
            io.emit("pauseVideoPlayback");
        });

        socket.on("seekVideo", (time: number) => {
            io.emit("updateVideoTime", time);
        });
    });
    res.end();
}
