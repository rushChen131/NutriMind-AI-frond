import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

import { api } from '@/services/api'
import { useUserStore } from '@/stores/userStore'
import type { FavoritesResponse } from '@/types/api'

export default function MePage() {
  const userId = useUserStore((s) => s.userId)
  const [favIds, setFavIds] = useState<string[]>([])

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
    <View style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <View>
        <Text style={{ color: '#666' }}>用户ID：</Text>
        <Text selectable>{userId}</Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>我的收藏</Text>
        {favIds.length === 0 ? <Text style={{ color: '#666' }}>暂无收藏</Text> : null}
        {favIds.map((id) => (
          <View
            key={id}
            style={{ background: '#fff', padding: 12, borderRadius: 10 }}
            onClick={() => Taro.navigateTo({ url: `/pages/recipe-detail/index?id=${id}` })}
          >
            <Text>{id}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

