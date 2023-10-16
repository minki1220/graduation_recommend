import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res){
  if (req.method == 'DELETE'){
    let session = await getServerSession(req, res, authOptions)

    const db = (await connectDB).db('store')
    let findDelete = await db.collection('post').findOne({ _id : new ObjectId(req.body) })

    if (findDelete.author == session.user.email) {
      let result = await db.collection('post').deleteOne({ _id : new ObjectId(req.body) })
      return res.redirect(302, '/list')
    } else {
      return res.status(500).json('현재유저와 작성자 불일치')
    }

  }
}