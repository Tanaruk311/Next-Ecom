

import { getServerSession } from "next-auth"

import { GetAddressByUserId } from "@/util/UserAction"
import {  MapPin, User2 } from "lucide-react"
import Link from "next/link"
import DeleteAddress from "./edit/[id]/DeleteAddress"
import { authOptions } from "@/lib/authOptions"


const ListUserAddress = async () => {

  
      const session = await getServerSession(authOptions)
      const userId = session?.user.id as string
      const address = await GetAddressByUserId({ userId })

  if (!address.length)
  
      <div className="p-6 text-center text-gray-500">
        <p>คุณยังไม่มีที่อยู่ที่บันทึกไว้</p>
      </div>
    
  

  return (
    <section className="px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📍 ที่อยู่จัดส่งของฉัน
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {address.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg p-6 transition-all relative"
          >
            <div className="absolute top-4 right-4 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              ที่อยู่ 
            </div>

            <div className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-700">
              <User2 className="w-5 h-5 text-blue-600" />
              <span> {item.fullName} {item.phone}</span>
            </div>

            <div className="flex gap-2 items-start text-gray-600 text-sm leading-relaxed">
              <MapPin className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p>{item.address}</p>
                <p>{item.subdistrict}</p>
                <p>{item.district}</p>

                <p>{item.province} {item.zip}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6"  >
              <button className="text-sm text-blue-600 hover:underline font-medium">
                <Link href={`/useraddress/edit/${item.id}`}>
                ✏️ แก้ไข
                </Link>

              </button>
              <DeleteAddress id={item.id}>
               
              </DeleteAddress>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition text-base font-semibold">
          <Link href={"/address"}>
          ➕ เพิ่มที่อยู่ใหม่
          </Link>
        </button>
      </div>
    </section>
  )
}

export default ListUserAddress
