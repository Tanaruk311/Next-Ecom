"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Orders from "./Orders"
import { GetAddressByUserId } from "@/util/UserAction"
import { useCartStore } from "../stroe/CartStore"
import { Trash2 } from "lucide-react"
import Image from "next/image"



const CheckoutPage = () => {
  const { data: session } = useSession()
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const [addresses, setAddresses] = useState<
    {
      id: string
      fullName: string
      address: string
      phone: string
      zip: string
      subdistrict: string
      district: string
      province: string
    }[]
  >([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)

  useEffect(() => {
    const loadAddress = async () => {
      if (!session?.user.id) return
      const res = await GetAddressByUserId({ userId: session.user.id })
      setAddresses(res)
      if (res.length > 0) {
        setSelectedAddressId(res[0].id)
      }
    }
    loadAddress()
  }, [session])

  if (!session?.user.id) return <div>⏳ กำลังโหลด session...</div>
  if (addresses.length === 0) return <div>❌ กรุณาเพิ่มที่อยู่ก่อนสั่งซื้อ</div>
  if (!selectedAddressId) return <div>⏳ กำลังโหลดที่อยู่...</div>

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
   <div className="max-w-6xl mx-auto p-6 relative">
  <h1 className="text-3xl font-bold mb-6">Checkout</h1>

  <div className="flex flex-col md:flex-row gap-8">
    {/* ซ้าย: รายการสินค้า */}
    <div className="flex-1 border p-4 rounded shadow max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">รายการสินค้า</h2>
      {cart.length === 0 ? (
        <p>ตะกร้าว่าง</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">รูป</th>
              <th className="border-b p-2">สินค้า</th>
              <th className="border-b p-2">จำนวน</th>
              <th className="border-b p-2">ราคาต่อชิ้น</th>
              <th className="border-b p-2">รวม</th>
              <th className="border-b p-2"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="border-b p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className=" object-cover rounded"
                  />
                </td>
                <td className="border-b p-2">{item.name}</td>
                <td className="border-b p-2">{item.quantity}</td>
                <td className="border-b p-2">{item.price.toLocaleString()} บาท</td>
                <td className="border-b p-2">{(item.price * item.quantity).toLocaleString()} บาท</td>
                <td className="border-b p-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2/>
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="text-right font-semibold p-2">รวมทั้งหมด</td>
              <td className="font-semibold p-2">{totalPrice.toLocaleString()} บาท</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>

    {/* ขวา: Fixed ที่มุมขวา */}
    <div className="relative w-full md:w-[320px]">
      <div className="sticky top-28 border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">เลือกที่อยู่จัดส่ง</h2>
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {addresses.map((addr) => (
            <label
              key={addr.id}
              className={`block p-4 border rounded cursor-pointer ${
                selectedAddressId === addr.id ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="address"
                value={addr.id}
                checked={selectedAddressId === addr.id}
                onChange={() => setSelectedAddressId(addr.id)}
                className="mr-3"
              />
              <span className="font-medium">{addr.fullName}</span> {addr.phone} <br />
              {addr.address} {addr.subdistrict} {addr.district} {addr.province} {addr.zip}
            </label>
          ))}
        </div>

        {/* ปุ่มยืนยันตรึงอยู่ล่าง */}
        <div className="mt-6">
          <Orders userId={session.user.id} addressId={selectedAddressId} />
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default CheckoutPage
