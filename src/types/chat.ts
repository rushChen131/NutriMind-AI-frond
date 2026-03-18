import type { Recipe } from './api'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  recipes?: Recipe[]
  createdAt: number
  regenerated?: boolean
}

