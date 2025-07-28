import { NextRequest,NextResponse } from "next/server";
import { GetAddressById } from "@/util/UserAction";


export const GET = async (req:NextRequest) => {
const userId = req.nextUrl.searchParams.get("userId")
if(!userId) return NextResponse.json({error:"ไม่พบข้อมูล userId"})

const addresses = await GetAddressById(userId)
return NextResponse.json(addresses)
}