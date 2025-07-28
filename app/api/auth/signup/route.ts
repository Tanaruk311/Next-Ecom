import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";



export  async function POST (req:Request){
    const {name , email ,password} = await req.json();
        const hashedPassword = await bcryptjs.hash(password,10)

    if (!email || !password || !name){
        return NextResponse.json({error:"ข้อมูลไม่ครบถ้วน"})
    }    
    const existingUser = await prisma.user.findUnique(
        {
            where:
            {
                email:email
            }
        })

       if  (existingUser) {
        return NextResponse.json({error:"มีผู้ใช้งานแล้ว"})
       }

       const newUser = await prisma.user.create(
        {
            data:{
                name:name,
                email:email,
                password:hashedPassword
            },
        }
       )
        return NextResponse.json(
    { message: "สมัครสมาชิกสำเร็จ", user: newUser },
    { status: 201 }
  );
}
    

