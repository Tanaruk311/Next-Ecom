"use server"
import prisma from "@/lib/prisma"

// ฟังก์ชันgetorders

export const getOrders = async ()=>{

    const orders = await  prisma.order.findMany({
        include: {
            user:{
                select:{
                    id: true,
                    name: true,
                    email: true,
               
                
                },
            },
            items:{
                include:{
                    product:{
                        select:{
                            id: true,
                            name: true,
                            image: true,
                            price: true
                        },
                    },
                },
            },
            address:true,

        },
        orderBy:{
            createdAt: "desc"
        },

    })
    return orders
}


export const GetAddress = async ()=> {
    const address = await prisma.address.findMany({
        include:{
            user:{
                select:{
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },                                                                                                      
            
        }
        
    })
    return address
}

export const UpdateOrderStatus = async({orderId,status}:{orderId:string,status:string})=>{
    try{
        const  updated = await prisma.order.update({
            where:{id:orderId},
            data:{status},

        })
        console.log("อัปเดตสถานะสําเร็จ",status)
    }catch{
        console.error("เปลี่ยนสถานะไม่สําเร็จ")
    }
}