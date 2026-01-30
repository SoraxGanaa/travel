import { cookies } from 'next/headers'

// Simple credential-based authentication for demo
// In production, use proper password hashing and secure session management

const ADMIN_CREDENTIALS = {
  email: 'admin@mongolia.travel',
  password: 'admin123' // In production, use bcrypt hashing
}

const SESSION_COOKIE_NAME = 'admin_session'

export interface AdminSession {
  email: string
  isAuthenticated: boolean
}

export async function authenticateAdmin(email: string, password: string): Promise<boolean> {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export async function createSession(email: string): Promise<void> {
  const cookieStore = await cookies()
  // In production, use a proper JWT or encrypted session token
  const sessionData = Buffer.from(JSON.stringify({ email, timestamp: Date.now() })).toString('base64')
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/'
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
  
  if (!sessionCookie?.value) return null
  
  try {
    const data = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
    return {
      email: data.email,
      isAuthenticated: true
    }
  } catch {
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session?.isAuthenticated ?? false
}
