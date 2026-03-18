# 后端说明（FastAPI）

## 技术栈

- FastAPI
- SQLAlchemy Async + sqlite（用户画像、收藏、对话记忆）
- Chroma（向量库，持久化）
- OpenAI 兼容接口（`openai` SDK）

## 分层结构

- `app/api/*`：路由
- `app/services/*`：业务编排（画像/收藏/记忆/聊天）
- `app/ai/*`：RAG + LLM + JSON/schema
- `app/data/*`：DB/ORM/seed/迁移

## 关键入口

- FastAPI 入口：`app/main.py`
- 数据表初始化：启动时执行 `init_db()`（`app/data/migrate.py`）
- ingest：`scripts/ingest_recipes.py`

## 环境变量

见 `backend/.env.example`（建议复制为 `.env`）。重点：

- `OPENAI_BASE_URL`、`OPENAI_API_KEY`、`OPENAI_MODEL`
- `CHROMA_PERSIST_DIR`
- `DATABASE_URL`

