import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions)
  console.log(session)
  if (req.method == 'POST'){
    let insertTags = {
      tags : req.body.tags
    }
    const db = (await connectDB).db('store')
    let result = await db.collection('user_cred').updateOne(
      {email : session.user.email},
      {$set : {insertTags}}
    )
    res.redirect(302, "/");
  }
}
