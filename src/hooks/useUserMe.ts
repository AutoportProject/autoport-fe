import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/api/axios'

interface UserMe {
  userId: number
  email: string
  name: string
  bio: string
  provider: string
  profileImage: string
  createdAt: string
}

export const useUserMe = () => {
  const [user, setUser] = useState<UserMe | null>(null)

  useEffect(() => {
    axiosInstance.get('/api/users/me')
      .then(({ data }) => setUser(data.data))
      .catch(() => setUser(null))
  }, [])

  return { user }
}