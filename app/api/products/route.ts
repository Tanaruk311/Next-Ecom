import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import cloudinary from "@/lib/cloundinary"

// ตั้งค่า cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const image = formData.get("image") as File

  if (!name || !description || !price || !image) {
    return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 })
  }

  try {
    // แปลงไฟล์เป็น base64 สำหรับ cloudinary
    const buffer = Buffer.from(await image.arrayBuffer())
    const base64Image = `data:${image.type};base64,${buffer.toString("base64")}`

    const uploadRes = await cloudinary.uploader.upload(base64Image, {
      folder: "next-ecom/products",
    })

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image: uploadRes.secure_url,
        imagePublicId: uploadRes.public_id,  // เก็บ public_id ไว้ในฐานข้อมูล
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (err) {
    console.error("Upload Error:", err)
    return NextResponse.json({ error: "ไม่สามารถเพิ่มสินค้าได้" }, { status: 500 })
  }
}


// app/api/products/route.ts


export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ error: "เพิ่มสินค้าไม่สำเร็จ" }, { status: 500 })
  }
}
