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
        socket.on("join room", (id: string) => {
            socket.join(id);

            // const users = io.sockets.adapter.rooms.get(id);
            // const uids: string[] = [];
            // users?.forEach((value) => uids.push(value));

            // io.to(id).emit("user join", "hi");
        });

        socket.on("leave", (id: string) => {
            socket.leave(id);
            socket.disconnect();

            // const users = io.sockets.adapter.rooms.get(id);
            // const uids: string[] = [];
            // users?.forEach((value) => uids.push(value));

            // io.to(id).emit("user leave", uids);
        });

        socket.on("change video url", (url: string, to: string) => {
            io.to(to).emit("recieve video url", url);
        });

        socket.on("play video", (to: string) => {
            io.to(to).emit("start video playback");
        });

        socket.on("pause video", (to: string) => {
            io.to(to).emit("pause video playback");
        });

        socket.on("seek video", (time: number, to: string) => {
            io.to(to).emit("update video time", time);
        });
    });

    res.end();
}
