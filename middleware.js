import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(request){
    const session = await getToken({req : request})

    if (request.nextUrl.pathname.startsWith('/write')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000/api/auth/signin')
        }
    }
    if (request.nextUrl.pathname.startsWith('/edit')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000/api/auth/signin')
        }
    }
    if (request.nextUrl.pathname.startsWith('/addTags')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000/api/auth/signin')
        }
    }
    if (request.nextUrl.pathname.startsWith('/tagsMap')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000/api/auth/signin')
        }
    }
    if (request.nextUrl.pathname.startsWith('/list')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000')
        }
    }
    if (request.nextUrl.pathname.startsWith('/detail')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000')
        }
    }
    if (request.nextUrl.pathname.startsWith('/mypage')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000')
        }
    }
    if (request.nextUrl.pathname.startsWith('/SignUp')){
        if(session !== null){
            return NextResponse.redirect('http://localhost:3000')
        }
    }
    if (request.nextUrl.pathname.startsWith('/api/auth/signin')){
        if(session !== null){
            return NextResponse.redirect('http://localhost:3000')
        }
    }
}