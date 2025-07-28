import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function ImageUploader({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  return (
    <div>
      <Label htmlFor="image">รูปสินค้า</Label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0])
          }
        }}
      />
    </div>
  )
}
