import { View, Text, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'

import { api } from '@/services/api'
import type { FavoritesResponse, Recipe } from '@/types/api'
import { useUserStore } from '@/stores/userStore'

export default function RecipeDetailPage() {
  const router = useRouter()
  const recipeId = useMemo(() => String((router.params as any)?.id || ''), [router.params])
  const userId = useUserStore((s) => s.userId)

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [favIds, setFavIds] = useState<string[]>([])
  const isFav = recipeId ? favIds.includes(recipeId) : false

  useEffect(() => {
    if (!recipeId) return
    ;(async () => {
      try {
        const r = await api.get<Recipe>(`/recipes/${recipeId}`)
        setRecipe(r.data)
      } catch (e) {
        Taro.showToast({ title: '加载失败', icon: 'none' })
      }
    })()
  }, [recipeId])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api.get<FavoritesResponse>(`/users/${userId}/favorites`)
        setFavIds(res.data.recipe_ids || [])
      } catch {
        setFavIds([])
      }
    })()
  }, [userId])

  return (
    <View style={{ padding: 16 }}>
      {!recipe ? (
        <Text style={{ color: '#666' }}>加载中…</Text>
      ) : (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{recipe.name}</Text>
          <Text style={{ color: '#666' }}>
            {recipe.time}分钟 · {recipe.calories}kcal · {(recipe.tags || []).join('/')}
          </Text>
          <Button
            onClick={async () => {
              try {
                if (isFav) {
                  const res = await api.delete<FavoritesResponse>(`/users/${userId}/favorites/${recipe.id}`)
                  setFavIds(res.data.recipe_ids || [])
                  Taro.showToast({ title: '已取消收藏', icon: 'none' })
                } else {
                  const res = await api.post<FavoritesResponse>(`/users/${userId}/favorites`, {
                    recipe_id: recipe.id
                  })
                  setFavIds(res.data.recipe_ids || [])
                  Taro.showToast({ title: '已收藏', icon: 'success' })
                }
              } catch {
                Taro.showToast({ title: '操作失败', icon: 'none' })
              }
            }}
          >
            {isFav ? '取消收藏' : '收藏'}
          </Button>
        </View>
      )}
    </View>
  )
}

