'use client'

import Link from "next/link"

export default function ListItem({result}) {
  return (
    <div className="bg">
      {/* 글 작성 버튼 */}
      <div className="write-btn">
      <Link href={'/write'}>
      <button>
        <span>글 작성하기</span>
      </button>
      </Link>
      </div>
      

      { result.map((a,i)=>
          <div className="list-box">
          <div className="list-item" key={i}>
            <Link href={'/detail/' + result[i]._id}>{result[i].title}<p>1월 1일</p></Link>
            <div className="list-btn">
            <Link href={'/edit/' + result[i]._id} >✏️</Link>
            <button onClick={(e)=>{
                fetch('/api/post/delete',
                {method : 'DELETE' ,
                 body : result[i]._id})
                .then((r)=>{
                  if(r.status == 200) {
                    return r.json()
                  } 
                //   else {
                   //오류 메세지
                //   }
                })
                .then(()=>{
                    e.target.parentElement.style.opacity = 0;
                    setTimeout(()=>{
                        e.target.parentElement.style.display = 'none';
                    },1000)
                })
                .then((result)=>{ 
                  //성공시 실행할코드
                }).catch((error)=>{
                  //인터넷문제 등으로 실패시 실행할코드
                  console.log(error)
                })
            }}>🗑️</button>
            </div>
            
            
          </div>
          </div>
       ) }
    </div>
  )
}