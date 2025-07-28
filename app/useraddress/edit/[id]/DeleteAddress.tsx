"use client"
import { Button } from "@/components/ui/button"
import { DeletetoAddress } from "@/util/UserAction"


const DeleteAddress = ({id}:{id:string}) => {
    
    
    const handleDelete = () => {
        const confirmDelete = window.confirm("คุณต้องการลบที่อยู่ใช่หรือไม่")
        if (confirmDelete){
            DeletetoAddress(id).then(() => {
                location.reload()
            })
        }
    } 
    
  return (
    <Button
    onClick={handleDelete} 
    variant="ghost"
    size="sm"
    className="text-red-500 hover:text-red-600">
         🗑 ลบ
    </Button>

  )
}
export default DeleteAddress