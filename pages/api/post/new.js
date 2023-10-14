import { connectDB } from "@/util/database"

export default async function handler(req, res) {
  if (req.method == 'POST'){
    if (req.body.title == '') {
      return res.status(500).json('제목써라')
    }
    let db = (await connectDB).db('store')
    let result = db.collection('post').insertOne(req.body);
    res.redirect(302, '/list')
  }
} 