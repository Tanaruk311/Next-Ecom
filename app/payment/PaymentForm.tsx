"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { PaymentInternet } from "@/util/ProductAction"
import { useCartStore } from "../stroe/CartStore"

const PaymentForm = () => {
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  const total = useCartStore((state) => state.getTotalPrice())
  const clearCart = useCartStore((state) => state.clearCart)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await PaymentInternet(total, "thb", "card")

    if (!result.success) {
      console.error("ชำระเงินไม่สำเร็จ:", result.error)
      alert("ชำระเงินไม่สำเร็จ กรุณาลองใหม่อีกครั้ง")
      return
    }

    console.log("ชำระเงินสำเร็จ:", result)
    router.push("/success")
    clearCart()
  }

  return (
    <div className="max-w-md mx-auto p-6 border-2 rounded-xl border-gray-200 w-full mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">ชำระเงินด้วยบัตรเครดิต</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>ชื่อบนบัตร</Label>
          <Input
            name="cardName"
            value={form.cardName}
            onChange={handleChange}
            required
            placeholder="ชื่อบนบัตรเครดิต"
          />
        </div>
        <div>
          <Label>หมายเลขบัตร</Label>
          <Input
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            required
            maxLength={16}
            pattern="\d{16}"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>วันหมดอายุ (MM/YY)</Label>
            <Input
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              required
              pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <Label>CVC</Label>
            <Input
              name="cvc"
              value={form.cvc}
              onChange={handleChange}
              required
              maxLength={3}
              pattern="\d{3}"
              placeholder="123"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          ชำระเงิน
        </Button>
      </form>
    </div>
  )
}

export default PaymentForm
