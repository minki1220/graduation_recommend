import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import PostLike from './PostLike'
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Comment from "./Comment"
import "@/../css/write.css"


export default async function Detail(props) {
  const db = (await connectDB).db('store')
    const result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    const session = await getServerSession(authOptions);
    let elementExis = null;
    
    if (session === null) {
        // result가 null인 경우에 대한 처리 (예: 에러 메시지 표시 또는 리다이렉트)
        // 예를 들면, 에러 메시지 표시 후 리다이렉트할 때:
        return <div style={{width : '100wh', height : '100vh', display: 'flex', justifyContent : 'center',alignItems : 'center'}}>회원가입 및 로그인을 해주세요.</div>;
    } else {
        if (session) {
            if (result.likeUser && result.likeUser.includes(session.user.email)) {
                elementExis = true;
            } else {
                elementExis = false;
            }
        } else {
            console.log('비로그인');
        }
        
        return (
            <div className="bg">
              <div>
              <PostLike
                    result={result}
                    name={result.name}
                    _id={result._id}
                    likeUser={result.likeUser}
                    postLikeCount={result.postLikeCount}
                    session={session}
                    elementExis={elementExis}
                />
                </div>
                <div>
                <h1>작성자 - {result.author}</h1>
                <h3>{result.title}</h3>
                <p>{result.content}</p>
                </div>
                <div className="comment-container">
                <Comment _id={result._id.toString()} />
                </div>
               
            </div>
        );
    }
}
