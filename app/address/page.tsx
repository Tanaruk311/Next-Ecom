
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { thaiProvinces } from "@/util/ThaiProvinces"
import { SaveAddress } from "@/util/ProductAction"
const AddressPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">ที่อยู่สำหรับจัดส่ง</h1>
      <form action={SaveAddress} className="space-y-5">
        <div>
          <Label>ชื่อ-นามสกุล</Label>
          <Input name="fullName" required />
        </div>
        <div>
          <Input
            name="phone"
            required
            type="text"
            pattern="0\d{9}"
            maxLength={10}
            title="กรุณาใส่เบอร์โทรศัพท์ 10 หลักให้ถูกต้อง"
            placeholder="เช่น 0891234567"
          />
        </div>
        <div>
          <Label>ที่อยู่</Label>
          <Textarea name="address" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>ตำบล / แขวง</Label>
            <Input name="subdistrict" required />
          </div>
          <div>
            <Label>อำเภอ</Label>
            <Input name="district" required />
          </div>
          <div>
            <Label>จังหวัด</Label>
            <select
              name="province"
              required
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">-- เลือกจังหวัด --</option>
              {thaiProvinces.map((province) => (
                <option value={province} key={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>รหัสไปรษณีย์</Label>
            <Input
              name="zip"
              required
              pattern="\d{5}"
              title="กรุณากรอกรหัสไปรษณีย์ให้ถูกต้อง (5 หลัก)"
              maxLength={5}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          ดำเนินการต่อ
        </Button>
        
        
      </form>
    </div>
  )
}

export default AddressPage
