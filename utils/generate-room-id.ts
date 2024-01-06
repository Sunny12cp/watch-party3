export const generateRoomId = (): string => {
    const roomId: string[] = [];
    const alphanumericChars: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

    for (let i = 0; i < 4; i++) {
        roomId.push(alphanumericChars[Math.floor(Math.random() * alphanumericChars.length)]);
    }

    return roomId.join("");
};
