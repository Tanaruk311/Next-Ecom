"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { UpDateProduct } from "@/util/ProductAction"
import ProductInput from "@/app/components/admin/ProductInput"
import ProductTextarea from "@/app/components/admin/ProductTextarea"
import ImageUploader from "@/app/components/admin/ImageUploader"
import toast from "react-hot-toast"

export default function EditProductForm() {
  // ดึง ID ของสินค้าจาก URL (เช่น /admin/products/[id]/edit)
  const { id } = useParams() as { id: string }
  const router = useRouter()

  // สร้าง state เพื่อเก็บข้อมูลที่ผู้ใช้จะกรอกหรือแก้ไข
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // โหลดข้อมูลสินค้าจาก API เมื่อ component mount (หรือ id เปลี่ยน)
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`) // ดึงสินค้าด้วย id
      const product = await res.json()

      // เอาข้อมูลที่ได้มาเติมใน form
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price.toString()) // แปลงราคาเป็น string
    }

    fetchProduct()
  }, [id])

  // ฟังก์ชันเมื่อ user submit ฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")   // clear error
    setSuccess("") // clear success

    // สร้าง FormData เพื่อแนบข้อมูล (รวมถึงไฟล์รูป)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    if (imageFile) {
      formData.append("image", imageFile) // แนบไฟล์ถ้ามี
    }

    // เรียก API PUT ผ่าน global function
    const success = await UpDateProduct(id, formData)

    if (success) {
      setSuccess("อัปเดตสินค้าสำเร็จแล้ว")
      toast.success("อัปเดตสินค้าสำเร็จแล้ว") // แสดงข้อความแจ้งเตือน

      router.push("/admin/products") // ไปหน้ารายการสินค้า
    } else {
      setError("อัปเดตสินค้าไม่สำเร็จ")
        toast.error("อัปเดตสินค้าไม่สำเร็จ") // แสดงข้อความแจ้งเตือน
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* อินพุตชื่อสินค้า */}
      <ProductInput
        label="ชื่อสินค้า"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* อินพุตรายละเอียดสินค้า */}
      <ProductTextarea
        label="รายละเอียด"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* อินพุตราคาสินค้า */}
      <ProductInput
        label="ราคา"
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* อัปโหลดรูปใหม่ */}
      <ImageUploader onFileSelect={(file) => setImageFile(file)} />

      {/* แสดงข้อความแจ้งเตือน */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {/* ปุ่มส่งฟอร์ม */}
      <Button type="submit" className="w-full">บันทึกการแก้ไข</Button>
    </form>
  )
}
