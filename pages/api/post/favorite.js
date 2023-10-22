import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { connectDB } from "@/util/database"

// POST 요청을 처리하는 엔드포인트
export default async function handlePostFavorite(req, res) {
  if (req.method === 'POST') {
    try {
      // POST 요청 처리 코드
      let session = await getServerSession(req, res, authOptions);
      if (!session) {
        res.status(401).json({ error: "사용자 인증이 필요합니다." });
        return;
      }

      const userEmail = session.user.email;
      const restaurantData = req.body;

      let db = (await connectDB).db('store');
      let userCollection = db.collection('mypage');
      const userFavorites = await userCollection.findOne({ email: userEmail });

      if (userFavorites) {
        if (!userFavorites.favorites) {
          userFavorites.favorites = [];
        }
        userFavorites.favorites.push(restaurantData);
        await userCollection.updateOne({ email: userEmail }, { $set: userFavorites });
      } else {
        await userCollection.insertOne({ email: userEmail, favorites: [restaurantData] });
      }

      res.status(201).json({ message: '즐겨찾기가 추가되었습니다.' });
    } catch (error) {
      console.error('오류 발생:', error);
      res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ error: '지원되지 않는 메서드입니다.' });
  }
}


