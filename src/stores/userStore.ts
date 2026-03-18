import { create } from 'zustand'
import Taro from '@tarojs/taro'

type UserState = {
  userId: string
  setUserId: (id: string) => void
}

const KEY = 'ai_recipe_user_id'

function getOrCreateUserId(): string {
  const existing = Taro.getStorageSync(KEY)
  if (existing) return String(existing)
  const id = `u_${Date.now()}_${Math.random().toString(16).slice(2)}`
  Taro.setStorageSync(KEY, id)
  return id
}

export const useUserStore = create<UserState>((set) => ({
  userId: getOrCreateUserId(),
  setUserId: (id) => {
    Taro.setStorageSync(KEY, id)
    set({ userId: id })
  }
}))

