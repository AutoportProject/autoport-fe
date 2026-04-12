export interface EmailSignupRequest {
  email: string
  password: string
  name: string
  bio: string
}

export interface OAuthSignupRequest {
  tempUserId: string
  name: string
  bio: string
}

export interface LoginRequest {
  email: string
  password: string
}