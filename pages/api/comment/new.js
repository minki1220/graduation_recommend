import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        // 로그인 상태가 아닌 경우 요청 거부
        return res.status(400).json({ error: "로그인이 필요합니다." });
    }
    if (req.method === 'POST') {
        req.body = JSON.parse(req.body);

        if (req.body.comment === '') {
            return res.status(400).json({ error: '빈 글입니다.' });
        }

        const db = (await connectDB).db('store');

        const commentToInsert = {
            parent: new ObjectId(req.body._id),
            content: req.body.comment,
            author: session.user.email,
            author_name : session.user.name
        }

        const result = await db.collection('comment').insertOne(commentToInsert);
        
        res.status(200).json(result);
    }
}
