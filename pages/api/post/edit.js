import { connectDB } from "@/util/database.js"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method == 'POST'){

    let change = {title : req.body.title, content : req.body.content}
    let db = (await connectDB).db('store')
    let result = await db.collection('post').updateOne(
      {_id : new ObjectId(req.body._id)}, 
      { $set : change} 
    );
    console.log(result)

    res.redirect(302, '/list')
  }
}