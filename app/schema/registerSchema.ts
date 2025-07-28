import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ"),
  email: z
    .string()
    .min(1, "กรุณากรอกอีเมล")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "อีเมลไม่ถูกต้อง",
    }),
  password: z.string().min(8, "กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร")
    .refine((val) => 
       /[A-Z]/.test(val) && // พิมพ์ใหญ่
        /[a-z]/.test(val) && // พิมพ์เล็ก
        /[0-9]/.test(val) && // ตัวเลข
        /[^A-Za-z0-9]/.test(val), // อักขระพิเศษ     
        {
        message: "รหัสผ่านต้องมีตัวเลข,พิมพ์ใหญ่,พิมพ์เล็ก,และอักษรพิเศษ",
    }),
  
})

export type RegisterSchema = z.infer<typeof registerSchema>