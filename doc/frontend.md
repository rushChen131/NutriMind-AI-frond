# 前端说明（Taro 小程序）

## 技术栈

- Taro 3 + React + TypeScript
- Zustand（`src/stores/*`）
- Axios（封装为 `src/services/api.ts`，内部走 `Taro.request`）

## 页面与路由

- `pages/chat/index`：聊天页（多轮、loading、重新生成、推荐卡片列表）
- `pages/recipe-detail/index`：菜谱详情页（收藏/取消收藏）
- `pages/me/index`：我的页（显示 userId 与收藏列表）

## 状态管理

- `userStore`：生成并持久化 `userId`
- `chatStore`：消息列表、loading/error、lastUserMessage、send/regenerate

## 与后端联调

默认 API baseUrl：`http://127.0.0.1:8000`。\n\n可在启动前设置环境变量 `API_BASE_URL` 覆盖（构建时注入 `__API_BASE_URL__`）。\n

