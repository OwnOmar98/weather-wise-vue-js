import { z } from 'zod'

export const emailSchema = z.string().email({ message: 'Enter a valid email address' })
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one capital letter',
  })
  .regex(/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, {
    message: 'Password must contains number or symbol (e.g.: $, %, ^, 7)',
  })

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginDto = z.infer<typeof LoginSchema>
