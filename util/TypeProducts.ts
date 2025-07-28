type Product = {
  id: string
  name: string
  description: string
  price: number
  createdAt: string | Date //ยืดหยุ่นกว่า
  image: string 
  
 
}

export default Product


type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin" // กำหนดเป็น union จะปลอดภัยกว่า
}



type AddressForm = {
  fullName: string
  phone: string
  address: string
  subdistrict: string
  district: string
  province: string
  zip: string
}

type CartItem = {
  productId: string
  quantity: number
  price: number  // ราคาปัจจุบัน
}

type CreateOrderInput = {
  userId: string
  addressId: string
  cartItems: CartItem[]
}

export type AddressWithUser = {
  id: string
  fullName: string
  phone: string
  address: string
  subdistrict: string
  district: string
  province: string
  zip: string
  userId: string
  createdAt: Date
  updatedAt?: Date
  user?: {
    id: string | null
    email: string | null
    name: string | null
    image: string | null
  }
}


export type { Product, User, AddressForm, CartItem, CreateOrderInput, }