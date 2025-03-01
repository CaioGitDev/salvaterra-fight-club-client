import { LoginSchema } from '@/schemas'
import type { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'

export default {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const response = await fetch('http://localhost:3333/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              email,
              password,
            }),
          })

          if (response.status === 401) {
            return null
          }

          const user = await response.json()
          return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
