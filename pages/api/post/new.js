import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  let dateTime = "";
  const date = new Date();
  const 연도 = date.getFullYear()
  const 월 = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  const 일 = date.getDate(); 
  const 시간 = date.getHours();
  const 분 = date.getMinutes();
  dateTime = `${연도}년 ${월}월 ${일}일 ${시간}시 ${분}분`;
  

  if (session) {
    req.body.author = session.user.email;
  }

  if (req.method == 'POST') {
    if (req.body.title == '') {
      return res.status(500).json('글제목이 비어있습니다.');
    }
    if (req.body.content == '') {
      return res.status(500).json('글내용이 비어있습니다.');
    }
    
    req.body.dateTime = dateTime; // req.body에 dateTime 추가
    
    
    let db = (await connectDB).db('store');
    let result = await db.collection('post').insertOne(req.body); // await 키워드 추가
    res.status(200).json({ redirect: '/list' });
  }
}
