import { connectDB } from "@/util/database"
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
      let session = await getServerSession(req, res, authOptions);
  
      const db = (await connectDB).db('store');
      const { restaurantName, restaurantPageUrl } = req.body;
  
      if (!restaurantName || !restaurantPageUrl) {
        return res.status(400).json('음식점 정보가 부족합니다.');
      }
  
      const filter = {
        email: session.user.email,
        favorites: {
          restaurantName: restaurantName,
          restaurantPageUrl: restaurantPageUrl,
        },
      };
  
      // MongoDB나 다른 데이터베이스에서 해당 음식점을 삭제하는 코드를 추가해야 합니다.
      await db.collection('mypage').updateOne(filter, { $pull: { favorites: filter.favorites } });
  
      return res.status(200).json('삭제 성공');
    } else {
      return res.status(405).json('잘못된 HTTP 메서드');
    }
  }
  