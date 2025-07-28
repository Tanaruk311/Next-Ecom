import ProductForm from "@/app/components/admin/ProductForm"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function NewProduct() {
  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">เพิ่มสินค้าใหม่</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  )
}
