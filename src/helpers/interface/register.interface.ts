import { z } from 'zod'
import { emailSchema, passwordSchema } from './login.interface'
export const RegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
})

export type RegisterDto = z.infer<typeof RegisterSchema>
