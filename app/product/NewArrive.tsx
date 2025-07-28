"use client"
import { GetNewProducts } from "@/util/ProductAction";
import Product from "@/util/TypeProducts";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewArrive =  () => {
    const [products,setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const newProducts = await GetNewProducts();
          setProducts(newProducts);
        };  
       fetchProducts();
      }, []);


  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
  {products.map((product) => (
    <div key={product.id} className="">
      <Image
        src={product.image}
        width={300}
        height={300}
        alt={product.name}
        className="w-full h-40 object-cover mb-2"
        
      />
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-green-600 font-bold">฿{product.price}</p>
    </div>
  ))}
</div>

  )
}
export default NewArrive