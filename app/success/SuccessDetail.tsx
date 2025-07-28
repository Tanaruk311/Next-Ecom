"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function SuccessDetail() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // redirect หลัง 5 วินาที

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4 text-center">
      <CheckCircle2 className="text-green-600 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">สั่งซื้อสำเร็จ!</h1>
      <p className="text-gray-700 mb-6">
        ขอบคุณสำหรับการสั่งซื้อ ระบบจะพาคุณกลับไปยังหน้าแรกภายใน 5 วินาที...
      </p>
      <Button onClick={() => router.push("/")}>กลับไปหน้าแรก</Button>
    </div>
  );
}
