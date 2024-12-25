import { connectToDB } from "@/utils/database";
import Post from "@/utils/models/post";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest, { params }: {params:Promise<{id: string}>}) => {
    try {
        const id = (await params).id
        await connectToDB();
        
        const post = await Post.findById(id).populate('author');
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
};

export const DELETE = async (request: NextRequest, {params}:{params:Promise<{id: string}>}) => {
    try {
        const id = (await params).id
        await connectToDB();
        await Post.findByIdAndDelete(id);
        
        return NextResponse.json("The post has been deleted successfully", { status: 200 })
    } catch (error) {
        return NextResponse.json({error:"Error deleting post"}, { status: 500 });
    }
};
