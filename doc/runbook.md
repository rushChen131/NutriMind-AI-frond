# 本地运行 Runbook

## 0. 前置条件

- Node.js 18+（用于 Taro 前端）
- Python 3.10+（用于 FastAPI 后端；本项目依赖的 FastAPI/Pydantic 版本不支持 Python 3.7）

## 1. 后端启动（FastAPI）

### 1.1 安装依赖

在 `backend/` 目录：

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

### 1.2 配置环境变量

复制并编辑：

```bash
copy .env.example .env
```

关键变量：

- `OPENAI_BASE_URL`：OpenAI 兼容 base url（如你有代理或本地网关）
- `OPENAI_API_KEY`：密钥
- `OPENAI_MODEL`：对话模型名
- `EMBEDDING_MODEL`：embedding 模型名
- `CHROMA_PERSIST_DIR`：Chroma 持久化目录
- `DATABASE_URL`：sqlite 文件路径（默认即可）

### 1.3 初始化数据（向量库）

```bash
python scripts\ingest_recipes.py
```

### 1.4 运行 API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

健康检查：`GET /healthz`

## 2. 前端启动（Taro）

在 `frond/` 目录：

```bash
npm install
```

开发（以微信小程序为例）：

```bash
npm run dev:weapp
```

然后用微信开发者工具打开 `frond/dist`（或按 Taro 输出目录设置）。

## 3. 端到端验收用例（建议顺序）

1. 在聊天页输入：`吃什么` → 返回 3 个菜谱（包含理由/标签/时间等）
2. 继续输入：`减脂，15分钟内，不要鸡蛋` → 推荐应符合新限制（多轮偏好生效）
3. 点击菜谱卡片进入详情页
4. 点击收藏 → 在“我的”页看到收藏列表；取消收藏后消失
5. 点“重新生成” → 同一输入触发重新推荐（应有 loading 与错误提示）

