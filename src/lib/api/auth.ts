const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const sendVerificationEmail = async (email: string) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/email/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  return res.json()
}

export const emailSignup = async (data: {
  email: string
  password: string
  name: string
  bio: string
  code: string
}) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const localLogin = async (data: {
  email: string
  password: string
}) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const oauthSignup = async (data: {
  tempUserId: string
  name: string
  bio: string
}) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/github/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}