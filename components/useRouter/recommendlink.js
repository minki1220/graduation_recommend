'use client'

import { useRouter } from "next/navigation"

export default function FoodRecommendLink(){
    let router = useRouter()
    return(
        <a href="/foodRecommend" onClick={()=>{router.prefetch()}}>음식 추천</a>
    )
}