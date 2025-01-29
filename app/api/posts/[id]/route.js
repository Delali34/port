// app/api/posts/[id]/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const post = await prisma.post.update({
      where: {
        id: params.id,
      },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        category: data.category,
        author: data.author,
        readTime: data.readTime,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Error updating post" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.post.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
