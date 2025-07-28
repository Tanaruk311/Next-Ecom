"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { FiHome, FiBox, FiPlusSquare, FiShoppingCart, FiUsers, FiMenu } from "react-icons/fi";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <FiHome size={20} /> },
  { label: "เพิ่มสินค้า", href: "/admin/products/add", icon: <FiPlusSquare size={20} /> },
  { label: "สินค้า", href: "/admin/products", icon: <FiBox size={20} /> },
  { label: "ออเดอร์", href: "/admin/orders", icon: <FiShoppingCart size={20} /> },
  { label: "ผู้ใช้", href: "/admin/users", icon: <FiUsers size={20} /> },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Overlay สำหรับมือถือ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-72 bg-gray-100 border-r p-6
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        <h2 className="text-2xl font-bold mb-8 text-gray-800 select-none">Admin Panel</h2>

        <nav className="flex flex-col space-y-3">
          {navItems.map(({ label, href, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300 hover:text-gray-900 transition-colors font-medium"
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-white min-h-screen">
        {/* ปุ่ม toggle sidebar สำหรับมือถือ */}
        <button
          className="md:hidden mb-4 px-4 py-2 bg-gray-200 rounded inline-flex items-center gap-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Menu"
        >
          <FiMenu size={20} />
          เมนู
        </button>

        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
    </div>
  );
}
