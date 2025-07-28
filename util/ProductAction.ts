"use server"

import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

import { stripe } from "@/lib/Strip"

import { authOptions } from "@/lib/authOptions"





// ฟังก์ชันในการลบสินค้า
export const DeleteProduct = async (id: string) => {
    try{    
    await prisma.product.delete({
        where:{id},
      })  
      
      return true 
      
    }catch(err){
    console.error("ลบสินค้าไม่สำเร็จ", err)
    return false
       
    }
}


// ฟังก์ชันในการอัปเดตสินค้า
export const UpDateProduct = async (id: string, data: FormData): Promise<boolean> => {
  try {
    
    const name = data.get("name") as string
    const description = data.get("description") as string
    const price = parseFloat(data.get("price") as string)
    
    await prisma.product.update({
      where:{id},
      data:{
        name,
        description,
        price
      },
    })
    

    return true
  } catch (err) {
    console.error("อัปเดตสินค้าไม่สำเร็จ", err)
    return false
  }
}




// ฟังก์ชันในการบันทึกที่อยู่
export async function SaveAddress(formData: FormData): Promise<void> {
  const fullName = formData.get("fullName")?.toString() || ""
  const phone = formData.get("phone")?.toString() || ""
  const address = formData.get("address")?.toString() || ""
  const subdistrict = formData.get("subdistrict")?.toString() || ""
  const district = formData.get("district")?.toString() || ""
  const province = formData.get("province")?.toString() || ""
  const zip = formData.get("zip")?.toString() || ""

  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  if (!userId) {
    throw new Error("ไม่พบผู้ใช้ที่ล็อกอินอยู่")
  }

  const existingAddresses = await prisma.address.findMany({
    where: { userId },
  })

  if (existingAddresses.length >= 2) {
    throw new Error("ไม่สามารถเพิ่มที่อยู่เกิน 2 ที่อยู่")
  }

  await prisma.address.create({
    data: {
      userId,
      fullName,
      phone,
      address,
      subdistrict,
      district,
      province,
      zip,
    },
  })

  redirect("/useraddress") // redirect ภายในฟังก์ชัน action
}

export const PaymentInternet = async (
  
  amount: number,
  currency: "thb",
  method: "card" | "promptpay" = "card"
) => {
  try {
     const amountInSatang = Math.round(amount * 100) // แปลงเป็นสตางค์

    if (amountInSatang < 1000) {
      throw new Error("ยอดชำระเงินต้องไม่น้อยกว่า 10 บาท")

    }

    const payment = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: [method],
  
  })
    const isPromptPay = method === "promptpay"
    const qrUrl = isPromptPay
      ? (payment.next_action?.promptpay_display_qr_code?.image_url_png || null)
      : null

    return {
      success: true,
      clientSecret: payment.client_secret,
      paymentId: payment.id,
      qrUrl, // ✅ เพิ่ม url รูป QR Code
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการชำระเงิน:", error)
    return {
      success: false,
      error: "ไม่สามารถดำเนินการชำระเงินได้ กรุณาลองใหม่อีกครั้ง",
    }
  }
}





export const createOrder = async ({
  userId,
  addressId,
  cartItems,
}: {
  userId: string
  addressId?: string
  cartItems: { productId: string; quantity: number; price: number }[]
}) => {
  if (!userId) throw new Error("userId is required")
  if (!addressId) throw new Error("addressId is required")
  if (!cartItems || cartItems.length === 0) throw new Error("ตะกร้าว่าง")

  // ✅ ตรวจสอบว่า addressId นี้เป็นของ user นี้จริง
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId: userId, // ป้องกัน user ใช้ address ของคนอื่น
    },
  })

  if (!address) {
    throw new Error("ไม่พบที่อยู่จัดส่ง หรือที่อยู่นี้ไม่ได้เป็นของผู้ใช้")
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const order = await prisma.order.create({
    data: {
      user: { connect: { id: userId } },
      address: { connect: { id: addressId } },
      totalPrice,
      items: {
        create: cartItems.map((item) => ({
          product: { connect: { id: item.productId } },
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: { include: { product: true } },
      address: true,
    },
  })

  return order
}


const searchProducts = async(qurey: string)=>{
  const products = await prisma.product.findMany({
    where:{
      OR:[
        {
      name:
      {
        contains:qurey,
        mode: "insensitive", //ไม่สนใจเคส
      },
    },
    {description:
      {
        contains:qurey,
        mode:"insensitive",
      }
    }
  ],
},
    
  

  })
  return products
}
export default searchProducts


export const GetNewProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  })
  return products
} 
