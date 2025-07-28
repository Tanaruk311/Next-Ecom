import { GetAddressById } from "@/util/UserAction"
import { notFound } from "next/navigation"
import EditAddress from "./EditeAddress"
import { AddressWithUser } from "@/util/TypeProducts"

type EditAddressPageProps = {
  params: Promise<{ id: string }>
}


const EditAddressPage = async ({ params }: EditAddressPageProps) => {
  const { id } = await params  // ต้อง await params ก่อน
  const data = await GetAddressById(id)

  if (!data) return notFound()

  return <EditAddress initialData={data[0] as AddressWithUser} />
}

export default EditAddressPage



