"use client"

import { useState } from "react"
import CartDrawer from "./CartDrawer"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "../CartStore"

export default function CartNavbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cart = useCartStore((state) => state.cart)
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="ml-auto flex items-center mr-5">
           <button
        className="relative"
        onClick={() => setIsCartOpen(true)}
        aria-label="Open cart"
      >
        <ShoppingCart size={24} />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
            {totalQuantity}
          </span>
        )}
      </button>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
