'use client'

import { signOut } from "next-auth/react"

export function LogOutBtn(){
    return (
      <button onClick={()=>{ signOut() }} style={{
      border:'2px solid black',
      backgroundColor:'#fff',
      marginRight:'5px',
      fontSize:'16px',
      cursor:'pointer',
      fontWeight:'bold',
      borderRadius:'2em',
      padding:'1em 2em',
      marginLeft:'20px'
    }}>LogOut</button>
    )
  } 