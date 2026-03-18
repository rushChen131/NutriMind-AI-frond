export interface Recipe {
  id: string
  name: string
  time: number
  calories: number
  tags: string[]
  reason?: string | null
}

export interface ChatRequest {
  user_id: string
  message: string
}

export interface ChatResponse {
  reply: string
  recipes: Recipe[]
}

export interface UserProfileResponse {
  user_id: string
  profile: Record<string, any>
}

export interface FavoritesResponse {
  recipe_ids: string[]
}

