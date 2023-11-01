'use client'

import { useRouter } from "next/navigation"

export default function MypageLink(){
    let router = useRouter()
    return(
        <a href="/mypage" onClick={()=>{router.prefetch()}} style={{ fontSize: '18px', marginRight: '10px',fontWeight : 'bold' }}>마이페이지</a>
    )
}