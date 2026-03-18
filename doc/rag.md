# RAG 说明

## 数据来源

当前使用 `backend/app/data/recipes_seed.json` 作为 seed 数据（≥50 条），字段包含：

- `id` / `name` / `time` / `calories` / `tags`
- `ingredients` / `steps`

## 向量库（Chroma）

- 持久化目录：`backend/.chroma`（可通过 `CHROMA_PERSIST_DIR` 覆盖）
- collection：`recipes`

## 构建方式

运行 ingest：

```bash
python scripts\ingest_recipes.py
```

它会把每条菜谱整理为可检索的 `document`（包含菜名、食材、标签、步骤），并把 `time/calories/tags/ingredients` 写入 metadata，用于后续展示与过滤扩展。

## 检索策略（当前实现）

- query：直接使用用户输入 `message`
- top_k：默认 8
- 返回：候选菜谱列表供 LLM 选择（RAG 优先）

## fallback 策略

- **检索为空**：直接返回解释文案 + 空 recipes（提示用户补充约束）
- **LLM 输出非 JSON 或 schema 校验失败**：重试 1 次；仍失败返回 fallback 文案 + 空 recipes

> 后续可升级：检索为空时也可返回 seed 中“通用健康菜谱”作为兜底 3 条，并标注 reason。

