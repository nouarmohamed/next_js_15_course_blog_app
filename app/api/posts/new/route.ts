import { connectToDB } from "@/utils/database";
import Post from "@/utils/models/post";
import { NextRequest, NextResponse } from "next/server";


export const POST = async(request: NextRequest)=>{
    try{
        const {userId, title, content} = await request.json()
        await connectToDB()
        const newPost = await Post.create({title: title, content: content, author: userId})
        return NextResponse.json(newPost, {status: 200})
    } catch(error){
        return NextResponse.json({error:'Failed to create Post'}, {status: 500})
    }
}