"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductInput from "./ProductInput"
import ProductTextarea from "./ProductTextarea"
import ImageUploader from "./ImageUploader"
import toast from "react-hot-toast"


export default function ProductForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!name || !description || !price || !imageFile) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("image", imageFile)

    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      const data = await res.json()
    
      toast.error(data.error || "เกิดข้อผิดพลาดในการเพิ่มสินค้า") // แสดงข้อความแจ้งเตือน
      return
    }
    
    toast.success("เพิ่มสินค้าสำเร็จแล้ว!") // แสดงข้อความแจ้งเตือน
    setName("")
    setDescription("")
    setPrice("")
    setImageFile(null)
    setLoading(false)
   
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <ProductInput
        label="ชื่อสินค้า"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ProductTextarea
        label="รายละเอียด"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ProductInput
        label="ราคา (บาท)"
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <ImageUploader onFileSelect={(file) => setImageFile(file)} />
  
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "กําลังเพิ่มสินค้า..." : "เพิ่มสินค้า" }</Button>
    </form>
  )
}
