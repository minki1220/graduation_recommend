import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions)
  
  if (session){
    req.body.author = session.user.email
  }
  if (req.method == 'POST'){
    if (req.body.title == '') {
      return res.status(500).json('제목써라')
    }
    let db = (await connectDB).db('store')
    let result = db.collection('post').insertOne(req.body);
    res.redirect(302, '/list')
  }
} 