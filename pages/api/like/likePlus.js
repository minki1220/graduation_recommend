import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb"
export default async function handler(req, res){
    let session = await getServerSession(req, res, authOptions)
    if(req.method === 'POST'){
        if(session){
            req.body = JSON.parse(req.body) 
            let client = await connectDB
            let db = client.db('store')
            let result = await db.collection('users').findOne({email : session.user.email})
            let save = {
                user : session.user.name, // 좋아요 누른 유저의 이름
                userLike_id : new ObjectId(result._id), // 좋아요 누른 유저의 _id
                postUser : req.body.name, // 해당 글 작성자 이름
                postLike_id : new ObjectId(req.body._id) // 해당 글의 _id
            }
            console.log(req.body)
            let result2 = await db.collection('post').findOne({_id : new ObjectId(save.postLike_id)})
            let arrUser = {likeUser : session.user.email} // 현재 좋아요 누른 유저의 이메일 정보
            let countPlus = {postLikeCount : 1} // 1증가
            try{
                await db.collection('post').updateOne({_id : new ObjectId(result2._id)}, {$push : arrUser})
                await db.collection('post').updateOne({_id : new ObjectId(result2._id)}, {$inc : countPlus})
                await db.collection('postlike').insertOne(save)
                let countRe = await db.collection('post').findOne({_id : new ObjectId(result2._id)}) // 좋아요 수 출력
                console.log(countRe)
                return res.status(200).json(['❤️', countRe.likeUser, countRe.postLikeCount])
            } catch{
                return res.status(500).json('서버 오류')
            }
        } else {
            return res.status(400).json('권한이 없습니다.')
        }
    } else {
        return res.status(400).json('잘못된 접근입니다.')
    }
}