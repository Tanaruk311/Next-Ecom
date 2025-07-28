
import Image from "next/image"
import { Button } from "@/components/ui/button"
import NewArrive from "./NewArrive"
import { TextAnimate } from "@/components/magicui/text-animate"
import Link from "next/link"



export default function HomeFirst() {
  return (
    <div className="bg-[#f8fdfa] text-[#111]">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src={"/hero1.png"} // เปลี่ยนเป็นรูปที่คุณมี
            alt="Hero Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-10 text-white">
            <h1 className="text-4xl font-bold mb-2">
              <TextAnimate>

              Elevate Your Style
              </TextAnimate>
              </h1>
            <p className="mb-4 text-lg">
              Discover the latest trends and timeless pieces that define your unique look.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-black">
              <Link href={"/product"}>
              Shop Now
              </Link>
              </Button>
          </div>
        </div>
      </section>


      {/* New Arrivals */}
      <section className="max-w-6xl mx-auto px-4 py-10 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
         <NewArrive/>
      </section>

      {/* Join Community */}
      <section className="text-center py-12 bg-white">
        <h2 className="text-2xl font-bold">Join Our Community</h2>
        <p className="text-gray-600 mt-2 mb-4">
          Stay updated on the latest trends, exclusive offers, and style tips.
        </p>
        <Button className="bg-green-500 hover:bg-green-600">Sign Up</Button>
      </section>

      {/* Footer */}
  
    </div>
  )
}
