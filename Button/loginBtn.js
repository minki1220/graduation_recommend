'use client'

import { signIn } from 'next-auth/react'

export default function LoginBtn(){
    return(
        <button onClick={()=>{ signIn() }} style={{
        border:'2px solid black',
        backgroundColor:'#fff',
        marginRight:'5px',
        fontSize:'16px',
        cursor:'pointer',
        fontWeight:'bold',
        borderRadius:'2em',
        padding:'1em 2em'
        }}>LogIn</button>
    )
}
