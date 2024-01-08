import { db } from "@/lib/firebase";
import { generateRoomId } from "@/utils/generate-room-id";
import { doc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const id = generateRoomId();

        await setDoc(doc(db, "rooms", id), {
            url: "",
        });

        res.status(200).json({ id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}
