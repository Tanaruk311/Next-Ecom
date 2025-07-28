import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ปรับ path ถ้าคุณเก็บ prisma client ไว้ที่อื่น
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export async function GET() {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueData] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.findMany({
        select: {
          createdAt: true,
          totalPrice: true,
        },
      }),
    ]);

    const totalRevenue = revenueData.reduce((sum, order) => sum + order.totalPrice, 0);

    // แปลงข้อมูลยอดขายเป็นแบบรายเดือน
    const salesByMonth: { month: string; total: number }[] = [];

    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = endOfMonth(subMonths(now, i));
      const monthOrders = revenueData.filter(
        (order) =>
          new Date(order.createdAt) >= monthStart &&
          new Date(order.createdAt) <= monthEnd
      );
      const monthTotal = monthOrders.reduce((sum, o) => sum + o.totalPrice, 0);
      salesByMonth.push({
        month: monthStart.toLocaleString("default", { month: "short" }), // เช่น "Jul"
        total: monthTotal,
      });
    }

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      salesByMonth,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
