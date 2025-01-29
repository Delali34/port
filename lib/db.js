// lib/db.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLatestPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
