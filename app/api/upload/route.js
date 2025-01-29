// app/api/upload/route.js
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/utils/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const result = await uploadToCloudinary(file);
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error in upload route:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
