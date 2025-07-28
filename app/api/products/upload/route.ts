import { NextRequest, NextResponse } from "next/server"
import cloudinary from "@/lib/cloundinary"
import prisma from "@/lib/prisma"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})
export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const image = formData.get("image") as File
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number(formData.get("price"))

  if (!image || !name || !description || !price) {
    return NextResponse.json({ error: "ข้อมูลไม่ครบ" }, { status: 400 })
  }

  // Convert File to Base64
  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`

  try {
    const uploadRes = await cloudinary.uploader.upload(base64Image, {
      folder: "next-ecom/products", // โฟลเดอร์ใน Cloudinary
    })

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image: uploadRes.secure_url,
        imagePublicId: uploadRes.public_id, // ใช้ลิงก์ภาพจาก Cloudinary
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Cloudinary Upload Error:", error)
    return NextResponse.json({ error: "ไม่สามารถอัปโหลดรูปได้" }, { status: 500 })
  }
}
