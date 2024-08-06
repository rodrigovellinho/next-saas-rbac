'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithPassword } from '@/src/http/sign-in-with-password'

const signInSchema = z.object({
  email: z.string().email({ message: 'Please, provide a valid email addrss' }),
  password: z.string().min(1, { message: 'Please, provide your password' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    console.log('token', token)
  } catch (err) {
    if (err instanceof HTTPError) {
      /*   const { message } = await err.response.json() */

      return {
        success: false,
        message: 'Unexpected error, try again in a few minutes',
        errors: null,
      }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
