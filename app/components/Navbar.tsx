"use client"

import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import LoginDialog from "./LoginDialog"
import CartNavbar from "../stroe/cart/CartNav"
import { ChartNoAxesCombined } from "lucide-react"



export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className="w-full px-6 py-4 bg-white shadow flex justify-between items-center">
     <div className="text-xl font-bold flex">
  <Link href="/" className="flex items-center space-x-2">
       <ChartNoAxesCombined className="h-6 w-6 mr-2" />
    <span>Trendify</span>
  </Link>
</div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>

        <Button variant="ghost" asChild>
          <Link href="/product">Products</Link>
        </Button>

        <CartNavbar/>

        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-4">
                {session.user?.name || "Account"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">โปรไฟล์</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/address">เพิ่มที่อยู่</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/useraddress">ที่อยู่</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/history">ประวัติการสั่งซื้อ</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                ออกจากระบบ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={() => setShowLogin(true)}>
            Login
          </Button>
        )}
      </div>

      <LoginDialog open={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
    

    
    
  )
}
