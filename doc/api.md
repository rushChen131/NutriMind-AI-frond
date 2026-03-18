# API 文档

## 基础信息

- Base URL：由前端配置 `__API_BASE_URL__` 指向（默认 `http://127.0.0.1:8000`）
- 数据格式：JSON

## 1. 健康检查

### GET `/healthz`

**Response**

```json
{"ok": true, "env": "dev"}
```

## 2. 对话推荐

### POST `/chat`

对应 PRD `5.1 Chat API`。

**Request**

```json
{
  "user_id": "string",
  "message": "string"
}
```

**Response**

```json
{
  "reply": "string",
  "recipes": [
    {
      "id": "r001",
      "name": "鸡胸肉蔬菜沙拉",
      "time": 15,
      "calories": 320,
      "tags": ["减脂", "高蛋白"],
      "reason": "string"
    }
  ]
}
```

## 3. 菜谱详情

### GET `/recipes/{recipe_id}`

**Response**

```json
{
  "id": "r001",
  "name": "鸡胸肉蔬菜沙拉",
  "time": 15,
  "calories": 320,
  "tags": ["减脂", "高蛋白"],
  "reason": null
}
```

## 4. 用户画像

### GET `/users/{user_id}/profile`

**Response**

```json
{
  "user_id": "u_xxx",
  "profile": {
    "goal": "减脂",
    "dislikes": ["鸡蛋"],
    "max_time": 15
  }
}
```

### POST `/users/{user_id}/profile`

**Request**

```json
{
  "profile": {
    "goal": "减脂"
  }
}
```

## 5. 收藏

### GET `/users/{user_id}/favorites`

**Response**

```json
{"recipe_ids": ["r001", "r050"]}
```

### POST `/users/{user_id}/favorites`

**Request**

```json
{"recipe_id": "r001"}
```

### DELETE `/users/{user_id}/favorites/{recipe_id}`

**Response**

```json
{"recipe_ids": []}
```

