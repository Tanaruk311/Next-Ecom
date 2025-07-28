
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { useCartStore } from "../CartStore"
import { ShoppingCart } from "lucide-react"
import Product from "@/util/TypeProducts"
// คุณสามารถปรับแต่ง Product type ตามโครงสร้างข้อมูลที่คุณใช้จริงๆ

const AddToCartButton = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // เริ่มต้น 1 ชิ้น
      image: product.image,
    })
    toast.success("เพิ่มลงตะกร้าแล้ว")
  }

  return (
    <Button onClick={handleAdd} 
    className="bg-green-600 text-white rounded-full  cursor-pointer hover:bg-green-700 hover:transform hover:scale-105 
    hover:transition duration-300 ">
        <ShoppingCart className="w-6 h-6" />
    </Button>
  )
}

export default AddToCartButton
