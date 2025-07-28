// app/admin/dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type OverviewData = {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  salesByMonth: { month: string; total: number }[]
}

const AdminDashboard = () => {
  const [data, setData] = useState<OverviewData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dashboard/overview")
      const json = await res.json()
      setData(json)
    }
    fetchData()
  }, [])

  if (!data) return <p className="p-4">กำลังโหลด...</p>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">แดชบอร์ดผู้ดูแล</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">ผู้ใช้งานทั้งหมด</p>
            <p className="text-2xl font-bold">{data.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">สินค้าทั้งหมด</p>
            <p className="text-2xl font-bold">{data.totalProducts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">จำนวนคำสั่งซื้อ</p>
            <p className="text-2xl font-bold">{data.totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">รายได้รวม</p>
            <p className="text-2xl font-bold">{data.totalRevenue.toLocaleString()} ฿</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white dark:bg-black rounded-xl shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">รายได้รายเดือน</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.salesByMonth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#4f46e5" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminDashboard
