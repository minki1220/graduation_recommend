'use client'

import { useRouter } from "next/navigation"

export default function ListLink(){
    let router = useRouter()
    return(
        <a href="/list" onClick={()=>{router.prefetch()}}>리뷰 공유</a>
    )
}