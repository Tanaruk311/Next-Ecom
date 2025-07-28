"use client"
import { useRouter } from "next/navigation"
import { useCartStore } from "../stroe/CartStore"
import { createOrder } from "@/util/ProductAction"
import { Button } from "@/components/ui/button"

type OrdersProps = {
  userId: string 
  addressId: string 
}

const Orders = ({ userId, addressId }: OrdersProps) => {
  const router = useRouter()
  const cart = useCartStore((state) => state.cart)


 const handlePlaceOrder = async () => {

  try {
    const order = await createOrder({
      userId,
      addressId,
      cartItems: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }))
    })

    //clearCart()
    router.push(`/payment?orderId=${order.id}`)
  } catch (error) {
    console.error(error)
    alert("เกิดข้อผิดพลาดในการสั่งซื้อ")
  }
}


  return (
    <div>
      <Button onClick={handlePlaceOrder}
      className="w-full  bg-green-500 hover:bg-green-600">ยืนยันคำสั่งซื้อ</Button>
    </div>
  )
}

export default Orders
