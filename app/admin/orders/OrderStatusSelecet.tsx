"use client"

import { UpdateOrderStatus } from "@/util/AdminProductAction"
import { Order } from "@prisma/client"
import React, { useState, useTransition } from "react"
import { toast } from "react-hot-toast"
    enum OrderStatus {
        กำลังดำเนินการ = "กำลังดำเนินการ",
        จัดส่ง = "จัดส่ง",
        สำเร็จ = "สำเร็จ",
        ยกเลิก = "ยกเลิก",
    }
    


const OrderStatusSelecet = ({order}:{order:Order}) => {
    const [isPending, startTransition] = useTransition()
    const [status, setStatus] = useState(order.status)

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
   const newstatus = e.target.value
    console.log(e.target.value)
    //UpdateOrderStatus()
    setStatus(newstatus)
    startTransition(()=>{
         UpdateOrderStatus({
            orderId:order.id,
            status:newstatus
            
            
        })
        toast.success("เปลี่ยนสถานะสําเร็จ")
      
        
         
    })



   
}


  return (
    <select
        onChange={handleChange}
        value={status}
        disabled={isPending}
        className="border px-1 py-2 rounded">
           {
            Object.values(OrderStatus).map((status)=>
            <option key={status} value={status}>
                {status}
            </option>)
            
           }
        {/* <option  value="จัดส่ง">จัดส่ง</option>
        <option  value="รอดำเนินการ">รอดำเนินการ</option>
        <option  value="สำเร็จ">สำเร็จ</option>
        <option  value="ยกเลิก">ยกเลิก</option> */}
    </select>
  )
}
export default OrderStatusSelecet