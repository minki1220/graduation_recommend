'use client'

import { useRouter } from "next/navigation"

export default function MapLink(){
    let router = useRouter()
    return(
        <a href="/map" onClick={()=>{router.prefetch()}}>주변 맛집</a>
    )
}