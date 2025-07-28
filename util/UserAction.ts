"use server"

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache"


export const GetAddressByUserId = async ({userId}:{userId:string})=>{
   if (!userId) return []
    try{
        const address = await prisma.address.findMany({
          where:{
            userId,
          },
          include:{
            user:true
          }, 
          
    })
    return address
     }catch(error){
            console.error("GET error:", error)
            return []
        }
          

}


// ฟังก์ชันในการดึง ท่ี่อยู่ของผู้ใช้
// ใน UserAction.ts
export const GetAddressById = async (userId: string) => {
  try {
    const address = await prisma.address.findMany({
      where: { userId },
      include: { user: true },
    })
    return address
  } catch (error) {
    console.error("GET address by ID error:", error)
    return null
  }
}


// แก้ไขที่อยู่
export async function updateAddress(id: string, formData: any) {
  try {
    await prisma.address.update({
      where: { id },
      data: {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        subdistrict: formData.subdistrict,
        district: formData.district,
        province: formData.province,
        zip: formData.zip,
      },
    })

    revalidatePath("/address") // หรือ path ที่ต้อง refresh
  } catch (err) {
    console.error("Update error", err)
    throw new Error("ไม่สามารถอัปเดตที่อยู่ได้")
  }
}

// ฟังก์ชันลบที่อยู่

export const  DeletetoAddress = async (id:string) =>{
  try{
  await  prisma.address.deleteMany({
    where:{
      id
    }
  })

}catch(err){
    console.error("ลบที่อยู่ไม่สําเร็จ", err)
  }
  

}

// ฟังก์ชันในการดึง orderuser by ID
export const GetUserOrders = async () => {
  try {

  const session = await getServerSession(authOptions)


  if (!session?.user?.email) {
   
    return []
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })


  if (!user) {
    
    return []
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: { include: { product: true } },
      address: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  
  return orders
} catch (error) {
  console.error("GET error:", error)
  return []
}
}


  