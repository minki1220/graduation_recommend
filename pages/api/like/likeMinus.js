import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
export default async function(req, res){
    if(req.method === "POST"){ // POST 로 받았을 때
        let session = await getServerSession(req, res, authOptions) // 현재 로그인한 세션
        if(session){ // 세션이 존재하는가 ?
            req.body = JSON.parse(req.body)
            let client = await connectDB
            let db = client.db('store')
            let result = await db.collection('users').findOne({email : session.user.email})
            let minusSave = {
                user : session.user.name, // 좋아요 누른 유저의 이름
                userLike_id : new ObjectId(result._id), // 좋아요 누른 유저의 _id
                postUser : req.body.name, // 해당 글 작성자 이름
                postLike_id : new ObjectId(req.body._id) // 해당 글의 _id
            }
            let result2 = await db.collection('post').findOne({_id : new ObjectId(minusSave.postLike_id)})
            let arrUser = {likeUser : session.user.email} // 현재 좋아요 누른 유저의 이메일 정보
            let countPlus = {postLikeCount : -1} // 1감소
            
            try {
                await db.collection('post').updateOne({_id : new ObjectId(result2._id)}, {$pull : arrUser})
                await db.collection('post').updateOne({_id : new ObjectId(result2._id)}, {$inc : countPlus})
                await db.collection('postlike').deleteOne(minusSave)
                let countRe = await db.collection('post').findOne({_id : new ObjectId(result2._id)}) // 좋아요 수 출력
                console.log(countRe)
                return res.status(200).json(['🤍',countRe.likeUser, countRe.postLikeCount])
            } catch {
                return res.status(500).json('실패')
            }
        }
    } else { // POST 외에 다른 요청으로 받았을 때 실패
        return res.status(400).json('잘못된 접근입니다.')
    }
}