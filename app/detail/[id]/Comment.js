'use client'

import { useEffect, useState } from "react"


export default function Comment(props) {
    let [comment, Setcomment] = useState('')
    let [commentList, SetCommentList] = useState([])
   

    const fetchComments = () => {
        fetch('/api/comment/list?id=' + props._id)
            .then(r => r.json())
            .then((result) => {
                SetCommentList(result)
            })
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const clearCommentField = () => {
        Setcomment(''); // 댓글 입력 필드를 비우기
    }

    return (
        <div>
            <textarea
                style={{width: '60%'}}
                value={comment} // 입력 필드를 현재 comment 상태와 연결
                onChange={(e) => {
                    Setcomment(e.target.value)
                }}
            />
            <button
                style={{border : '1px solid black',marginBottom:'10px'}}
                onClick={() => {
                    fetch("/api/comment/new", {
                        method: "POST",
                        body: JSON.stringify({
                            comment: comment,
                            _id: props._id,
                        })
                    })
                        .then(r => r.json())
                        .then((result) => {
                            console.log(result);
                            clearCommentField(); // 코멘트를 저장한 후에 코멘트 입력 필드를 비웁니다.
                            fetchComments(); // 코멘트를 저장한 후에 코멘트 리스트를 다시 가져옵니다.
                        })
                }}
            >
                저장
            </button>
           
                {commentList.map((a, i) => 
                    
                        <div key={i}>
                            <span>{a.author_name} - {a.content}</span>
                            
                            
                            <button onClick={(e)=>{
                fetch('/api/comment/delete',
                {method : 'DELETE' ,
                 body : commentList[i]._id
                 })
                 .then(r => r.json())
                        .then((result) => {
                            console.log(result);
                            fetchComments(); // 코멘트를 저장한 후에 코멘트 리스트를 다시 가져옵니다.
                        })
            }}>🗑️</button>
                            
                        </div>
                )}
            
        </div>
    )
}
