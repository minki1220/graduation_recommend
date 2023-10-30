'use client'

import { useEffect, useState } from "react"
export default function PostLike(props){
    let [heart, setHeart] = useState('🤍')
    let [auto, setAuto] = useState(props.elementExis)
    useEffect(()=>{
        if(auto === null || auto === false){
            
            setHeart('🤍')
        } else if (auto === true){
            
            setHeart('❤️')
        }
    },[])
    let [likeUserList, setLikeUserList] = useState(props.likeUser)
    let [likeCount, setLikeCount] = useState(props.postLikeCount)
    let [trg, setTrg] = useState(false)
    // let [err, setErr] = useState(true)
    let res = null
    return(
        <div>
                <button onClick={(e)=>{
                    {
                        if(auto === null || auto === false){ // 좋아요 안눌러저 있을 때
                            
                            fetch('/api/like/likePlus',{
                                method : "POST",
                                body : JSON.stringify({likeCount : likeCount, _id : props._id, name : props.name})
                            }).then((response)=>{
                                if(response.status === 200){
                                    res = true
                                    return response.json()
                                } else {
                                    res = false
                                    return response.json()
                                }
                            }).then((result)=>{
                                if(res === true){ // 로그인 세션 존재 하면
                                    setAuto(true)
                                    setHeart(result[0])
                                    setLikeUserList(result[1])
                                    setLikeCount(result[2])
                                    console.log('좋아요 체크')
                                } else { // 로그인 세션 존재 하지 않으면
                                    setErr('권한이 없습니다.')
                                }
                            }).catch((error)=>{
                                console.log(error)
                            })
                        } else if(auto === true){ // 좋아요 눌러저 있을 떄
                            
                            fetch('/api/like/likeMinus', {
                                method : "POST",
                                body : JSON.stringify({likeCount : likeCount, _id : props._id, name : props.name})
                            }).then((response)=>{
                                if(response.status === 200){
                                    res = true
                                    return response.json()
                                } else {
                                    res = false
                                    return response.json()
                                }
                            }).then((result)=>{
                                if(res === true){
                                    setAuto(false)
                                    setHeart(result[0])
                                    setLikeUserList(result[1])
                                    setLikeCount(result[2])
                                    console.log('좋아요 취소')
                                } else {
                                    setErr('권한이 없습니다.')
                                }
                            }).catch((error)=>{
                                console.log(error)
                            })
                        }
                    }
                }}>{heart}</button>
                {likeCount < 1 ? null : <button onClick={()=>{
                    setTrg(!trg)
                }}>좋아요 목록</button>}
                {likeCount < 1 ? null : <p>{likeCount} 명이 좋아합니다.</p>}
                {trg === false ? null : <ListOne likeUserList={likeUserList}/>}
                {/* {err === false ? null : <ErrPopup err={err} />  } */}
            </div>
       
    )
}
function ListOne(props) {
    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {props.likeUserList.map((a, i) => (
                    <li key={i}>{a}</li>
                ))}
            </ul>
        </div>
    );
}
