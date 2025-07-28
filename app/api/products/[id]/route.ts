import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloundinary";
import { Readable } from "stream";
import { Prisma } from "@prisma/client";

type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
};

// แปลง Buffer เป็น Stream สำหรับ Cloudinary
function bufferToStream(buffer: Buffer) {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

function getIdFromRequest(req: NextRequest) {
  // ดึง id จาก pathname เช่น /api/products/<id>
  // pathname จะเป็น /api/products/xxx
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1];
}

// GET /api/products/[id]
export async function GET(req: NextRequest) {
  const id = getIdFromRequest(req);

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "ไม่พบสินค้า" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(req: NextRequest) {
  const id = getIdFromRequest(req);

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const image = formData.get("image") as File | null;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "ไม่พบสินค้า" }, { status: 404 });
    }

    const updateData: Prisma.ProductUpdateInput = {
      name,
      description,
      price,
    };

    if (image && image.size > 0) {
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = (await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error || !result) reject(error || new Error("Upload failed"));
              else resolve(result);
            }
          );
          bufferToStream(buffer).pipe(stream);
        }
      )) as CloudinaryUploadResult;

      updateData.image = uploadResult.secure_url;
      updateData.imagePublicId = uploadResult.public_id;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "อัปเดตสินค้าไม่สำเร็จ" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(req: NextRequest) {
  const id = getIdFromRequest(req);

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ message: "ไม่พบสินค้า" }, { status: 404 });
    }

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "ลบสินค้าสำเร็จ" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "ลบสินค้าไม่สำเร็จ" }, { status: 500 });
  }
}
