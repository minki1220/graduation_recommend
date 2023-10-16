'use client'

import Link from 'next/link'

export default function SignupBtn(){
    return(
        <Link href="/SignUp"><button style={{
        border:'2px solid black',
        backgroundColor:'silver',
        marginRight:'5px',
        fontSize:'16px',
        cursor:'pointer',
        fontWeight:'bold',
        borderRadius:'2em',
        padding:'1em 2em'
        }}>SignUp</button></Link>
    )
}