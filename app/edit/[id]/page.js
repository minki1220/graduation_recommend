import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js"
import '@/../css/write.css';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Edit(props) {
  let session = await getServerSession(authOptions)
  let db = (await connectDB).db('store')
  let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)});
  if(result.author !== session.user.email){
    return(
      <div className='bg'>
        <span style={{display : 'flex',
                      justifyContent : 'center',
                      alignItems : 'center',
                      marginLeft : 'auto',
                      marginRight : 'auto',
                      fontSize : '40px',
                      fontWeight : 'bold'}}>수정 권한이 없습니다. </span>
      </div>   
    )}else{
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
} 