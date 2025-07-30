"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "../CartStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginDialog from "@/app/components/LoginDialog";
import Orders from "@/app/checkout/Orders";
import toast from "react-hot-toast";
import { AddressForm } from "@/util/TypeProducts";

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { data: session } = useSession();
  const router = useRouter();
  const [OpenLoginDialog, setLoginDialogOpen] = useState(false);
  const [address, setAddress] = useState<AddressForm[]>([]);
  const [loading, setLoading] = useState(true);

  // โหลดที่อยู่เมื่อ session พร้อม
  useEffect(() => {
    const loadAddress = async () => {
      if (session?.user.id) {
       const res = await fetch(`/api/user/addresses?userId=${session.user.id}`);

        if (res.ok) {
          const data = await res.json();
          setAddress(data);
        } else {
          setAddress([]);
        }
      }
      setLoading(false);
    };

    loadAddress();
  }, [session?.user.id]);

  // ฟังก์ชันตรวจสอบก่อน checkout
  const handleCheckout = () => {
    if (!session) {
      setLoginDialogOpen(true);
      return;
    }

    if (!loading) {
      if ((address?.length ?? 0)=== 0) {
        toast.error("กรุณาเพิ่มที่อยู่ก่อนทำการชำระเงิน");
        router.push("/useraddress"); // หรือ path หน้าเพิ่มที่อยู่ของคุณ
      } else {
        router.push("/payment");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">ตะกร้าสินค้า</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cart.length === 0 ? (
            <p>ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mt-2"
              >
                <div className="flex gap-4 w-full">
                 
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover shadow-md"
                  />
                  <div className="flex flex-col gap-0.5 ">
                    <p className="capitalize">{item.name} </p>
                    <p className="text-gray-500">{item.price} ฿</p>
                    <p className="text-gray-500">จำนวน: {item.quantity}</p>
                    <p>
                      รวม: {(item.price * item.quantity).toLocaleString()} ฿
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="ghost"
                  className="p-2"
                >
                  <span className="text-gray-400 hover:text-red-500">
                    <Trash2 />
                  </span>
                </Button>
              </div>
            ))
          )}
        </div>

        {/* right : order summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:w-full h-fit">
          <h2>รายการสั่งซื้อ</h2>
          <div className="flex justify-between  text-gray-600 mb-4 border-b pb-2">
            <span>ยอดรวม</span>
            <span className="font-semibold text-black">
              {total.toLocaleString()} ฿
            </span>
          </div>

          {/* แสดงรายการที่อยู่ผ่าน Orders (ถ้ามี) */}
    {session?.user?.id && (address?.length ?? 0) > 0 && (
    <Orders userId={session.user.id} addressId="" />
)}


        </div>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-end mt-8">
        <Button onClick={handleCheckout}>ชำระเงิน</Button>
      </div>

      {/* Login Dialog */}
      <LoginDialog
        open={OpenLoginDialog}
        onClose={() => setLoginDialogOpen(false)}
      />
    </div>
  );
};

export default Checkout;
