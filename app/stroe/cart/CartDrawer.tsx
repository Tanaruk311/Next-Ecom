"use client"
import { useRouter } from "next/navigation"
import React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer"
import { useCartStore } from "../CartStore"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import UpdateCart from "./UpdateCart"
import Image from "next/image"

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const cart = useCartStore((state) => state.cart)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const router = useRouter()

  return (
    <Drawer open={open} onOpenChange={onClose} >
      <DrawerContent className="ml-auto w-full sm:max-w-md mr-4  ">

        <DrawerHeader>
          <DrawerTitle>ตะกร้าสินค้า</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center space-x-2">
                <Image
  src={item.image ?? "/placeholder.jpg"}
  alt={item.name}
  width={40}
  height={40}
  className="object-cover rounded"
/>

                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ฿{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ">
                  <span className="font-bold">฿{item.price * item.quantity}</span>
                  <UpdateCart id={item.id} quantity={item.quantity} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))
          )}
          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>รวม</span>
            <span>฿{total}</span>

          </div>

        </div>
<DrawerFooter>
  <Button  className="w-full mt-2 mb-2 bg-green-500 hover:bg-green-600 text-white"
    onClick={() => {router.push('/checkout'); onClose();}}>
    ชำระเงิน
  </Button>
</DrawerFooter>

      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
