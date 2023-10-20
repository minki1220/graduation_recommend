import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req,res){
    let session = await getServerSession(req,res,authOptions)
    const db = (await connectDB).db('store')
    let result = await db.collection('users').findOne({ email : session.user.email})
    res.status(200).json(result.insertTags.tags)
}