import { connectToDB } from "@/utils/database";
import Post from "@/utils/models/post";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query") || ''

  try {
    await connectToDB();
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    }).populate("author").sort({ createdAt: 'desc' });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" },{ status: 500 }
    );
  }
};
