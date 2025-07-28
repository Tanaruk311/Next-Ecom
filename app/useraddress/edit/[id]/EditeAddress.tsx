"use client"

import {  useState, useTransition } from "react"
import { AddressForm, AddressWithUser } from "@/util/TypeProducts"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { updateAddress } from "@/util/UserAction"
import { useRouter } from "next/navigation"



const EditAddress = ({ initialData }: { initialData: AddressWithUser }) => {
  const [formData, setFormData] = useState<Partial<AddressForm>>(initialData)
  const [isPending, startTransition] = useTransition()
  const Router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(() => {
      updateAddress(initialData.id, formData)
      Router.push("/useraddress")
      
    })
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">แก้ไขที่อยู่</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["fullName", "phone", "address", "subdistrict", "district", "province", "zip"].map((field) => (
          <div key={field}>
            <Label>{field}</Label>
            <Input
              name={field}
              value={formData[field as keyof AddressForm] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <Button type="submit" disabled={isPending}>
          {isPending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
        </Button>
      </form>
    </div>
  )
}

export default EditAddress
