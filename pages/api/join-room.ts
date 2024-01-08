import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            throw new Error("This request method is not allowed");
        }

        const id = JSON.parse(req.body);
        const roomDoc = await getDoc(doc(db, "rooms", id));

        if (roomDoc.exists()) {
            return res.status(200).json({ isRoomAvailable: true });
        }

        return res.status(200).json({ isRoomAvailable: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}
