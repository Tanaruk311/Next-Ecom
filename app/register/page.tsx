"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "react-hot-toast"
import { registerSchema } from "../schema/registerSchema"


export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const formData = { email, password, name }

    const parsed = registerSchema.safeParse(formData)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message
      setError(firstError || "ข้อมูลไม่ถูกต้อง")
      return
    }

    setLoading(true)
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
    })
    setLoading(false)

    if (!res.ok) {
      const data = await res.json()
      setError(data?.error || "สมัครไม่สำเร็จ")
    } else {
      toast.success("สมัครสมาชิกสําเร็จ")
      setTimeout(() => router.push("/"), 1000)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* ด้านซ้าย */}
      <div className="relative bg-green-100 hidden md:flex items-center justify-center p-10">
        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold text-green-700 mb-4">ยินดีต้อนรับ!</h2>
          <p className="text-lg text-green-800">
            สมัครสมาชิกเพื่อเริ่มต้นการใช้งานเว็บไซต์ของเราได้เลย
          </p>
          <Image
            src="/signup.png"
            alt="Welcome"
            width={400}
            height={300}
            className="mx-auto mt-8 rounded-lg shadow-lg border border-green-300"
          />
        </div>
      </div>

      {/* ด้านขวา */}
      <div className="flex items-center justify-center bg-white px-8 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">สมัครสมาชิก</h2>
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <Label>ชื่อ</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="ชื่อของคุณ"
              />
            </div>
            <div>
              <Label>อีเมล</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
              />
            </div>
            <div>
              <Label>รหัสผ่าน</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </Button>

            <p className="text-sm text-center text-gray-600">
              มีบัญชีอยู่แล้ว?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                เข้าสู่ระบบ
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
