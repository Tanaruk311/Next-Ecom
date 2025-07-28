"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { Loader2 } from "lucide-react"

export default function LoginDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน")
      setLoading(false)
    } else {
      setTimeout(()=>{
      onClose()
      window.location.reload()

      },1000)
      
    }
  }

  const goToRegister = () => {
    onClose()
    router.push("/register")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            เข้าสู่ระบบ
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">รหัสผ่าน</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div className="text-sm text-slate-500 hover:underline cursor-pointer" onClick={goToRegister}>
            ยังไม่มีบัญชี? สมัครสมาชิก
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            {
              loading? ( 
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังเข้าสู่ระบบ...
              </>

              ): (
                "เข้าสู่ระบบ"
              )
            }
          
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            type="button"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-xl" />
            เข้าสู่ระบบด้วย Google
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
