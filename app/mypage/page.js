import { connectDB } from "@/util/database.js"
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import MyPage from "@/components/mypage/mypage";


export default async function Mypage() {
    let session = await getServerSession(authOptions)
    
    let db = (await connectDB).db('store')
    let result = await db.collection('mypage').findOne({ email: session.user.email });
    console.log(result)
    return (
        <div>
            <MyPage result={result} session ={session}/> 
        </div>
    )
}
