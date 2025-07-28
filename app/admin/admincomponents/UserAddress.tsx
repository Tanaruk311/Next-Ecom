// UserAddress.tsx

import { GetAddress } from "@/util/AdminProductAction"

const UserAddress = async () => {
  const addresses = await GetAddress()

  if (addresses.length === 0) {
    return <p className="text-center mt-10 text-red-500">ไม่พบที่อยู่</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">รายการที่อยู่ผู้ใช้งาน</h1>

      {/* ทำให้ตารางเลื่อนแนวนอนบนมือถือ */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-blue-200 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-3 border text-center">#</th>
              <th className="p-3 border text-center">ชื่อผู้ใช้งาน</th>
              <th className="p-3 border text-center">อีเมล</th>
              <th className="p-3 border text-center">เบอร์โทร</th>
              <th className="p-3 border text-center">ที่อยู่</th>
              <th className="p-3 border text-center">ตำบล</th>
              <th className="p-3 border text-center">อำเภอ</th>
              <th className="p-3 border text-center">จังหวัด</th>
              <th className="p-3 border text-center">รหัสไปรษณีย์</th>
              <th className="p-3 border text-center">Role</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {addresses.map((item, index) => (
              <tr
                key={item.id}
                className="even:bg-gray-50 hover:bg-gray-100 transition duration-150"
              >
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border text-center">{item.user.name ?? "-"}</td>
                <td className="p-3 border text-center">{item.user.email ?? "-"}</td>
                <td className="p-3 border text-center">{item.phone}</td>
                <td className="p-3 border text-center">{item.address}</td>
                <td className="p-3 border text-center">{item.subdistrict}</td>
                <td className="p-3 border text-center">{item.district}</td>
                <td className="p-3 border text-center">{item.province}</td>
                <td className="p-3 border text-center">{item.zip}</td>
                <td className="p-3 border text-center">{item.user.role ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserAddress
