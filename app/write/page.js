'use client'

import { getServerSession } from 'next-auth'
import '@/../css/write.css'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { connectDB } from '@/util/database'
import { useState } from 'react'

export default async function Write() {
  let session = await getServerSession(authOptions)
  let [src, setSrc] = useState('')

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
        <input type="file" accept="image/*"
          onChange={async(e)=>{
            let file = e.target.files[0]
            let filename = encodeURIComponent(file.name)
            let res = await fetch('/api/post/image?file=' + filename)
            res = await res.json()

            //S3 업로드
          const formData = new FormData()
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value)
          })
          let 업로드결과 = await fetch(res.url, {
            method: 'POST',
            body: formData,
          })
          console.log(업로드결과)

          if (업로드결과.ok) {
            setSrc(업로드결과.url + '/' + filename)
          } else {
            console.log('실패')
          }
          }}/>
          <img src={src} />
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
