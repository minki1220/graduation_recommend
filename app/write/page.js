import { getServerSession } from 'next-auth'
import '@/../css/write.css'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { connectDB } from '@/util/database'

export default async function Write() {
  let session = await getServerSession(authOptions)
  // console.log(session.user.email)

   if(!session || !session.user.email){
    return(
        <span>로그인 해주세요</span>   
    ) 
   }else {
    return(
      <div className="bg">
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목"/>
        <input name="content" placeholder="글내용"/>
        <button type="submit">전송</button>
      </form>
      </div>)
   }
    
   }

  //   return (
  //     <div className="p-20">
  //       <form action="/api/post/new" method="POST">
  //         <input name="title" placeholder="글제목"/>
  //         <input name="content" placeholder="글내용"/>
  //         <button type="submit">전송</button>
  //       </form>
  //     </div>
  //   )
