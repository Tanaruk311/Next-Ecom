import { getOrders } from "@/util/AdminProductAction"
import OrderStatusSelecet from "./OrderStatusSelecet"


const AdminOrders = async () => {
    const orders = await getOrders()

    if (!Array.isArray(orders) || orders.length === 0) {
        return <p className="text-center text-gray-500 mt-10">ไม่พบคำสั่งซื้อ</p>
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">คำสั่งซื้อทั้งหมด</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-200 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-3 text-center">#</th>
                            <th className="p-3 text-center">รหัสคำสั่งซื้อ</th>
                            <th className="p-3 text-center">ชื่อ</th>
                            <th className="p-3 text-center">อีเมล</th>
                            <th className="p-3 text-center">สินค้า</th>
                            <th className="p-3 text-center">ราคา (บาท)</th>
                            <th className="p-3 text-center">จำนวน</th>
                            <th className="p-3 text-center">ราคารวม</th>
                            <th className="p-3 text-center">วันที่สั่งซื้อ</th>
                            <th className="p-3 text-center">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {orders.map((order, index) => (
                            <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                <td className="p-3 text-center font-medium text-gray-600">{index + 1}</td>
                                <td className="p-3 text-center">{order.id}</td>
                                <td className="p-3 text-center">{order.user.name}</td>
                                <td className="p-3 text-center">{order.user.email}</td>
                                <td className="p-3 text-center">
                                    {order.items.map((item) => item.product.name).join(", ")}
                                </td>
                                <td className="p-3 text-center text-gray-500">
                                    {order.items.map((item) => item.product.price).join(", ")}
                                </td>
                                <td className="p-3 text-center">{order.items.reduce((q, i) => q + i.quantity, 0)}</td>
                                <td className="p-3 text-center text-green-600 font-semibold">
                                    {order.totalPrice.toLocaleString()}
                                </td>
                                <td className="p-3 text-center text-gray-500 whitespace-nowrap">
                                    {new Date(order.createdAt).toLocaleString("th-TH", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    })}
                                </td>
                                <td className="p-3 text-center">
                                  <OrderStatusSelecet order={order}/>
                                 
                                  
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminOrders
