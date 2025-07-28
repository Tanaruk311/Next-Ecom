"use client"

import { useParams } from "next/navigation"
import ButtonEdite from "@/app/admin/admincomponents/ButtonEdite"

const EditPage = () => {
  const { id } = useParams() as { id: string }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">แก้ไขสินค้า: {id}</h1>
      <ButtonEdite/>
      {/* ปุ่มแก้ไขสินค้า */}
      {/* คุณสามารถดึงข้อมูล product โดยใช้ id นี้ */}
    </div>
  )
}

export default EditPage
