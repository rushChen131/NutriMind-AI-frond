import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useMemo, useState } from 'react'

import { useChatStore } from '@/stores/chatStore'

export default function ChatPage() {
  const [draft, setDraft] = useState('')
  const { messages, loading, error, sendMessage, regenerate } = useChatStore()

  const canSend = useMemo(() => draft.trim().length > 0 && !loading, [draft, loading])

  return (
    <View style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.length === 0 ? (
          <Text style={{ color: '#666' }}>试试输入：吃什么 / 减脂 15分钟 不要鸡蛋</Text>
        ) : null}
        {messages.map((m) => (
          <View
            key={m.id}
            style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '86%',
              background: m.role === 'user' ? '#111' : '#fff',
              color: m.role === 'user' ? '#fff' : '#111',
              padding: 10,
              borderRadius: 10
            }}
          >
            <Text>{m.content}</Text>
            {m.recipes?.length ? (
              <View style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {m.recipes.map((r) => (
                  <View
                    key={r.id}
                    style={{
                      border: '1px solid #eee',
                      borderRadius: 10,
                      padding: 10,
                      background: '#fafafa'
                    }}
                            onClick={() => Taro.navigateTo({ url: `/pages/recipe-detail/index?id=${r.id}` })}
                  >
                    <Text style={{ fontWeight: 'bold' }}>{r.name}</Text>
                    <View style={{ marginTop: 4 }}>
                      <Text style={{ color: '#666' }}>
                        {r.time}分钟 · {r.calories}kcal · {(r.tags || []).join('/')}
                      </Text>
                    </View>
                    {r.reason ? (
                      <View style={{ marginTop: 4 }}>
                        <Text style={{ color: '#333' }}>{r.reason}</Text>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ))}
        {loading ? <Text style={{ color: '#666' }}>AI 思考中…</Text> : null}
        {error ? <Text style={{ color: '#b00020' }}>{error}</Text> : null}
      </View>

      <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Input
          value={draft}
          onInput={(e) => setDraft((e.detail.value || '').slice(0, 200))}
          placeholder="输入你的需求（如：减脂 15分钟 不要鸡蛋）"
          disabled={loading}
          style={{ background: '#fff', borderRadius: 10, padding: 10 }}
        />
        <View style={{ display: 'flex', gap: 8 }}>
          <Button
            disabled={!canSend}
            onClick={async () => {
              const text = draft
              setDraft('')
              await sendMessage(text)
            }}
          >
            发送
          </Button>
          <Button disabled={loading} onClick={regenerate}>
            重新生成
          </Button>
        </View>
      </View>
    </View>
  )
}

