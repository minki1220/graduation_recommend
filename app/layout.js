import Link from 'next/link'
import './globals.css'
import { LogOutBtn } from '@/Button/logoutBtn'
import LoginBtn from '@/Button/loginBtn'
import SignupBtn from '@/Button/signupBtn'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>
      <div className="navbar">
      {/* 여기에 아이콘 추가하기 */}
      <span className="logo">오늘 뭘 먹지?</span>
      <div className='menu'>
      <Link href="/">홈</Link>
      <Link href="/foodRecommend">음식 추천</Link>
      <Link href="/list">게시판</Link>
      </div>
      <div className='loginSignup-Btn'>
      { 
      session ? (
        <span style={{fontWeight : 'bold'}}>
          {session.user.name}님 환영합니다. <LogOutBtn />
        </span>
      ) : (
        <span>
          <LoginBtn />
          <SignupBtn />
        </span>
      )
      }
      </div>  
      </div>
        {children}
        </body>
    </html>
  )
}
