"use client"
import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import Image from "next/image"
import AddToCartButton from "../stroe/cart/AddtoCartButton"
import SearchProduct from "./SearchProduct"
import useDebounce from "../hook/useDebounce"
import Product from "@/util/TypeProducts"

interface ProductWithRating extends Product {
  rating?: number
}

export default function ProductListPage() {
  const [products, setProducts] = useState<ProductWithRating[]>([])
  const [allProducts, setAllProducts] = useState<ProductWithRating[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearch = useDebounce(searchTerm, 300)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) {
          throw new Error("โหลดข้อมูลไม่สำเร็จ")
        }

        const data: Product[] = await res.json()

        // เพิ่ม rating หลอกเข้าไป
        const dataWithFakeRating: ProductWithRating[] = data.map((product) => ({
          ...product,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
        }))

        setProducts(dataWithFakeRating)
        setAllProducts(dataWithFakeRating)
      } catch (err) {
        console.error("โหลดสินค้าล้มเหลว:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const query = debouncedSearch.trim().toLowerCase()

    if (query === "") {
      setProducts(allProducts)
    } else {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
      setProducts(filtered)
    }
  }, [debouncedSearch, allProducts])

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">สินค้าทั้งหมด</h1>
      <div className="sm:w-1/2 w-full">
        <SearchProduct value={searchTerm} onChange={(e) => setSearchTerm(e)} />
      </div>

      {loading ? (
        <p>กำลังโหลดสินค้า...</p>
      ) : products.length === 0 ? (
        <p>ไม่พบสินค้าที่ค้นหา</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 mb-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border flex flex-col"
            >
              {product.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="flex flex-col flex-grow p-4 justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                  </p>

                  {/* แสดงดาว */}
                  <div className="flex items-center mt-2 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          product.rating && i < Math.round(product.rating)
                            ? "fill-yellow-400 stroke-yellow-400"
                            : "stroke-gray-300"
                        }
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      {product.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-green-600 font-bold text-base">
                    ฿{product.price.toLocaleString()}
                  </span>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
