import { db } from "@/lib/firebase";
import { generateRoomId } from "@/utils/generate-room-id";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const room_id = generateRoomId();

        await setDoc(doc(db, "rooms", room_id), {
            time_created: serverTimestamp(),
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}
