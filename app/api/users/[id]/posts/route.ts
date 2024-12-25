import { connectToDB } from "@/utils/database"
import Post from "@/utils/models/post"
import User from "@/utils/models/user"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest, {params}:{params:Promise<{id: string}>})=>{
    try{
        const id = (await params).id
        await connectToDB()
        const user = await User.findById(id)

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const posts = await Post.find({author: id}).sort({'createAt': -1})
        return NextResponse.json({user,posts}, {status: 200});
    } catch(error){
        return NextResponse.json({error: "Failed to fetch posts"},{status:500})
    }
}