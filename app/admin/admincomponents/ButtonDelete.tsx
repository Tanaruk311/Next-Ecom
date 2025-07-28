"use client"

import { Button } from "@/components/ui/button"
import { DeleteProduct } from "@/util/ProductAction"

import { Trash2 } from "lucide-react"



const ButtonDelete = ({ id,onDeleted }: { id: string,onDeleted: () => void }) => {

 // const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    const confirmDelete = confirm("คุณต้องการลบหรือไม่?")
    if (!confirmDelete) return

    const success = await DeleteProduct(id)

    if (success) {
    
      alert("ลบสินค้าสำเร็จ")
      onDeleted()
       // ✅ เรียกฟังก์ชันจาก parent เพื่อ trigger refresh
    } else {
      alert("ลบสินค้าไม่สำเร็จ")
    }
  }

  return (
    <Button
      onClick={handleDelete}
      variant="outline"
      size="icon"
      className="bg-red-500 text-white"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  )
}

export default ButtonDelete
