import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import PostLike from './PostLike'
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"


export default async function Detail(props) {
  const db = (await connectDB).db('store')
    const result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) });
    const session = await getServerSession(authOptions);
    let elementExis = null;
    
    if (result === null) {
        // result가 null인 경우에 대한 처리 (예: 에러 메시지 표시 또는 리다이렉트)
        // 예를 들면, 에러 메시지 표시 후 리다이렉트할 때:
        // return <div>포스트를 찾을 수 없습니다.</div>;
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
              <div className="write">
                <h4>상세페이지</h4>
                <h4>{result.title}</h4>
                <p>{result.content}</p>
                <span>작성자 {result.name} - {result.author}</span>
                <PostLike
                    result={result}
                    name={result.name}
                    _id={result._id}
                    likeUser={result.likeUser}
                    postLikeCount={result.postLikeCount}
                    session={session}
                    elementExis={elementExis}
                />
                {/* <Comment _id={result._id} /> */}
              </div>
            </div>
        );
    }
}
