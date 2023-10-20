import { getServerSession } from 'next-auth'
import '@/../css/write.css'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { connectDB } from '@/util/database'

export default async function Write() {
  let session = await getServerSession(authOptions)
  // console.log(session.user.email)

   if(!session || !session.user.email){
    return(
      <div className='bg'>
        <span style={{display : 'flex',
                      justifyContent : 'center',
                      alignItems : 'center',
                      marginLeft : 'auto',
                      marginRight : 'auto',
                      fontSize : '40px',
                      fontWeight : 'bold'}}>작성 권한이 없습니다. 로그인 및 회원가입을 해주세요.</span>
      </div>
         
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
