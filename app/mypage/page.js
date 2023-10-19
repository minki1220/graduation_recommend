
import { connectDB } from "@/util/database.js"
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Mypage() {
    let session = await getServerSession(authOptions)
    console.log(session)
    let db = (await connectDB).db('store')
    let result = await db.collection('user_cred').findOne({ email : session.user.email});
    console.log(result.insertTags.tags)
     
  return (
    <div className="bg">
      <div>
        <h4>마이페이지임</h4>
      </div>
      
      <span>{session.user.name}</span>
      <p>{session.user.email}</p>
      <p>{result.insertTags.tags}</p>
    </div>
  )
  
}