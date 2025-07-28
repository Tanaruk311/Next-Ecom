import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type SearchProductProps = {
  value: string
  onChange: (value: string) => void
}

const SearchProduct = ({ value, onChange }: SearchProductProps) => {
  return (
    <div className="p-4 mx-auto max-w-xl text-start">
        <div className="relative">
        <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 " />
      <Input
        type="text"
        name="search"
        placeholder="ค้นหาสินค้า..."
        value={value}
        onChange={(e) => onChange(e.target.value)}/>
            </div>
    </div>
  )
}

export default SearchProduct
