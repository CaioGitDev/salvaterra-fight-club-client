'use server'

import { signIn } from '../../auth'
import { DEFAULT_LOGIN_REDIRECT } from '../../routes'
import { LoginSchema } from '@/schemas'
import { z } from 'zod'
import { AuthError } from 'next-auth'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validateFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: 'Logged in!' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default: {
          return { error: 'An error occurred!' }
        }
      }
    }
    throw error
  }
}
