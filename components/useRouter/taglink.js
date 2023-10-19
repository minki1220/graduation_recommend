'use client'

import { useRouter } from "next/navigation"

export default function TagMapLink(){
    let router = useRouter()
    return(
        <a href="/addTags" onClick={()=>{router.prefetch()}}># 맛집</a>
    )
}