// app/orders/history/page.tsx

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"


import {  GetUserOrders } from "@/util/UserAction"
import { Badge } from "@/components/ui/badge"


export default async function History() {
  const orders = await GetUserOrders()

  const statusClassMap: Record<string, string> = {
 
  "จัดส่ง": "text-blue-600 border-blue-600",
  "สำเร็จ": "text-green-600 border-green-600",
  "ยกเลิก": "text-red-600 border-red-600",
}


  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">ประวัติคำสั่งซื้อ</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">ยังไม่มีคำสั่งซื้อ</div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg font-semibold">
                    คำสั่งซื้อ #{order.id.slice(0, 8).toUpperCase()}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={`text-sm border ${
                      statusClassMap[order.status]?? "text-gray-600 border-gray-600"}`}>
                    {order.status}
                  </Badge>

                </div>

              </CardHeader>

              <CardContent className="space-y-3 text-sm text-gray-700">
                <p>📅 วันที่สั่ง: {new Date(order.createdAt).toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}</p>
                <p>💰 ยอดรวม: ฿{order.totalPrice.toLocaleString()}</p>

                <div>
                  <p className="font-medium">📦 รายการสินค้า:</p>
                  <ul className="list-disc list-inside mt-1">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.product?.name ?? "ไม่พบสินค้า"} × {item.quantity} — ฿{item.price.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium">📍 ที่อยู่จัดส่ง:</p>
                  {order.address ? (
                    <p className="text-gray-600">
                      {order.address.fullName}, {order.address.phone} <br />
                      {order.address.address}, {order.address.subdistrict}, {order.address.district}, {order.address.province},
                      {order.address.zip}
                    </p>
                  ) : (
                    <p className="text-red-500">ไม่มีข้อมูลที่อยู่</p>
                  )}
                </div>


              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
