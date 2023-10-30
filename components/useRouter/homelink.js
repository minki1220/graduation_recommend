'use client'

import { useRouter } from "next/navigation"

export default function HomeLink(){
    let router = useRouter()
    return(
        <a href="/" onClick={()=>{router.prefetch()}}>홈</a>
    )
}