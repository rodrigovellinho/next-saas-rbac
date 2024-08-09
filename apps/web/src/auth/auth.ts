import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '../http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    console.log('user1', user)

    return { user }
  } catch (err) {
    console.log('err', err)
  }

  redirect('/api/auth/sign-out')
}
