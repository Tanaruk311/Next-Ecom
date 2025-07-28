import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// โครงสร้างข้อมูลของสินค้าที่อยู่ในตะกร้า
export type CartItem = {
  id: string        // รหัสสินค้า
  name: string      // ชื่อสินค้า
  price: number     // ราคาสินค้า
  quantity: number  // จำนวนสินค้าในตะกร้า
  image: string     // URL รูปภาพสินค้า
}

// รูปแบบของ state และฟังก์ชันที่ใช้จัดการตะกร้า
type CartState = {
  cart: CartItem[]  // รายการสินค้าที่อยู่ในตะกร้า (array ของ CartItem)

  // ฟังก์ชันเพิ่มสินค้าเข้าไปในตะกร้า
  addToCart: (item: CartItem) => void

  // ฟังก์ชันลบสินค้าจากตะกร้าโดยใช้ id
  removeFromCart: (id: string) => void

  // ฟังก์ชันแก้ไขจำนวนสินค้าในตะกร้า
  updateQuantity: (id: string, quantity: number) => void

  // ฟังก์ชันล้างตะกร้า (ลบสินค้าทั้งหมด)
  clearCart: () => void

  // ฟังก์ชัน คำนวณราคารวมของสินค้าทั้งหมดในตะกร้า
  getTotalPrice: () => number  
}

// สร้าง zustand store พร้อมเปิดใช้ persist (เก็บสถานะใน localStorage)
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [], // กำหนดค่าเริ่มต้นของตะกร้าเป็น array ว่าง

      // ฟังก์ชันเพิ่มสินค้า
      addToCart: (item) => {
        // ตรวจสอบว่าสินค้าที่จะเพิ่มมีอยู่ในตะกร้าแล้วหรือไม่
        const exists = get().cart.find((i) => i.id === item.id)
        if (exists) {
          // ถ้ามีอยู่แล้ว ให้เพิ่มจำนวนสินค้าในตะกร้านั้น
          set({
            cart: get().cart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity } // บวกจำนวนเก่า+ใหม่
                : i
            ),
          })
        } else {
          // ถ้าไม่มีอยู่ในตะกร้า ให้เพิ่มสินค้านั้นลงไปใหม่
          set({ cart: [...get().cart, item] })
        }
      },

      // ฟังก์ชันลบสินค้าโดยใช้ id
      removeFromCart: (id) => {
        set({ cart: get().cart.filter((i) => i.id !== id) }) // กรองเอาสินค้าอื่นๆ ยกเว้น id ที่จะลบ
      },

      // ฟังก์ชันอัปเดตจำนวนสินค้าในตะกร้า
      updateQuantity: (id, quantity) => {
        set({
          cart: get().cart.map((i) =>
            i.id === id ? { ...i, quantity } : i // แก้จำนวนเฉพาะสินค้าที่ตรงกับ id
          ),
        })
      },

      // ฟังก์ชันล้างตะกร้าทั้งหมด
      clearCart: () => {
        set({ cart: [] }) // กำหนดตะกร้าให้ว่างเปล่า
      },

      getTotalPrice: () => {
        // คำนวณราคารวมของสินค้าทั้งหมดในตะกร้า
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      }
      
    }),


    {
      name: 'cart-storage', // ชื่อ key ที่จะเก็บข้อมูลใน localStorage
      storage: createJSONStorage(() => localStorage), // ใช้ localStorage เป็นที่เก็บข้อมูล
    }
    
  )
)
