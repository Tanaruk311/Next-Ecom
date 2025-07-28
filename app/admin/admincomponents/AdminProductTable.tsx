"use client"
import { Card } from "@/components/ui/card"
import { useState,useEffect } from "react"
import Product from "@/util/TypeProducts"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Pencil,  } from "lucide-react"
import Link from "next/link"
import ButtonDelete from "./ButtonDelete"


const AdminProductTable = () => {
    const [products, setProducts] = useState<Product[]>([])
     const [refreshKey, setRefreshKey] = useState(0) //สร้าง state สำหรับการรีเฟรชข้อมูล


    useEffect(() => {
        const fetchProducts = async () => {
            // ดึงข้อมูลสินค้าใหม่ทุกครั้งที่ refreshKey เปลี่ยน
            const res = await fetch("/api/products")
            const data = await res.json()
            setProducts(data)
        }
        fetchProducts()
    },[refreshKey])  // โหลดข้อมูลใหม่เมื่อ refreshKey เปลี่ยนแปลง 
    //  ✅ dependency นี้จะทำให้ useEffect ทำงานอีกครั้งเมื่อ refreshKey เปลี่ยน
    

  return (
   <Card className="p-6">
    <h2>สินค้าทั้งหมด</h2>
    <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-left">
                <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">รูป</th>
                    <th className="px-4 py-2">ชื่อสินค้า</th>
                    <th className="px-4 py-2">ราคา</th>
                    <th className="px-4 py-2">วันที่</th>
                    <th className="px-4 py-2">การจัดการ</th>
                </tr>
            </thead>
            <tbody>
               {
                products.map((product,index) => (
                <tr className="border" key={product.id}>
                    <td className="px-4 py-3">{index+1}</td>
                    <td className="px-4 py-3">
                   {/* card image */}
                   <Image
                   src={product.image}
                   alt={product.name}
                   width={60}
                   height={60} 
                   className="rounded-md object-cover w-16 h-16" 
                   
                   />
                   </td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.price}</td>
                    <td className="px-4 py-3">
                        {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3  space-x-2">
                            <Link href={`/admin/products/${product.id}/edit`} >
                            <Button

                            variant="outline" size={"icon"}
                            className="bg-gray-400"
                            
                           >
                                <Pencil className="w-4 h-4"/>
                            </Button> 
                                </Link>
                                          {/* ส่งฟังก์ชัน onDeleted เพื่อให้ปุ่มลบสามารถแจ้งให้หน้านี้โหลดข้อมูลใหม่ได้ */}
                           <ButtonDelete id={product.id} onDeleted={() => setRefreshKey(refreshKey + 1)}/>
                                            {/* // ทุกครั้งที่สินค้าถูกลบ เราเพิ่ม refreshKey ทีละ 1 เพื่อกระตุ้นการรีเฟรช */}
                        </td>
                </tr>
                    ))
               }
                
            </tbody>
        </table> 

    </div>

   </Card>
  )
}
export default AdminProductTable