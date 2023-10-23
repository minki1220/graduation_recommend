import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js"
import '@/../css/write.css';

export default async function Edit(props) {
  let db = (await connectDB).db('store')
  let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
  return (
    <div className="bg">
      <form action="/api/post/edit" method="POST">
        <input name="title" defaultValue={result.title} />
        <input name="content" defaultValue={result.content}/>
        <input style={{display : 'none'}} name="_id" defaultValue={result._id}/>
        <button type="submit">수정하기</button>
      </form>
    </div>
  )
} 