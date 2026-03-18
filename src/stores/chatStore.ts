import { create } from 'zustand'

import type { ChatMessage } from '@/types/chat'
import type { ChatResponse } from '@/types/api'
import { api } from '@/services/api'
import { useUserStore } from '@/stores/userStore'

type ChatState = {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
  lastUserMessage: string | null
  sendMessage: (content: string) => Promise<void>
  regenerate: () => Promise<void>
  clearError: () => void
}

function nowId() {
  return `m_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  loading: false,
  error: null,
  lastUserMessage: null,

  clearError: () => set({ error: null }),

  sendMessage: async (content: string) => {
    const text = content.trim()
    if (!text) return

    const userId = useUserStore.getState().userId
    const userMsg: ChatMessage = {
      id: nowId(),
      role: 'user',
      content: text,
      createdAt: Date.now()
    }

    set((s) => ({
      messages: [...s.messages, userMsg],
      loading: true,
      error: null,
      lastUserMessage: text
    }))

    try {
      const res = await api.post<ChatResponse>('/chat', { user_id: userId, message: text })
      const assistantMsg: ChatMessage = {
        id: nowId(),
        role: 'assistant',
        content: res.data.reply,
        recipes: res.data.recipes,
        createdAt: Date.now()
      }
      set((s) => ({ messages: [...s.messages, assistantMsg], loading: false }))
    } catch (e: any) {
      set({ loading: false, error: e?.message || '请求失败' })
    }
  },

  regenerate: async () => {
    const last = get().lastUserMessage
    if (!last) return
    const before = get().messages
    set({ messages: [...before], loading: true, error: null })

    const userId = useUserStore.getState().userId
    try {
      const res = await api.post<ChatResponse>('/chat', { user_id: userId, message: last })
      const assistantMsg: ChatMessage = {
        id: nowId(),
        role: 'assistant',
        content: res.data.reply,
        recipes: res.data.recipes,
        createdAt: Date.now(),
        regenerated: true
      }
      set((s) => ({ messages: [...s.messages, assistantMsg], loading: false }))
    } catch (e: any) {
      set({ loading: false, error: e?.message || '重新生成失败' })
    }
  }
}))

