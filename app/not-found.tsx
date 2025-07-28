"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Ghost className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2">ไม่พบหน้านี้</h1>
      <p className="text-gray-500 mb-6">
        หน้าที่คุณพยายามเข้าถึงไม่มีอยู่ในระบบ หรืออาจถูกลบไปแล้ว
      </p>
      <Link href="/">
        <Button>กลับไปหน้าหลัก</Button>
      </Link>
    </div>
  )
}
