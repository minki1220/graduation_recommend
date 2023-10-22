'use client'

import { useRouter } from "next/navigation"

export default function MypageLink(){
    let router = useRouter()
    return(
        <a href="/mypage" onClick={()=>{router.prefetch()}} style={{ fontSize: '16px', marginRight: '10px' }}>마이페이지</a>
    )
}