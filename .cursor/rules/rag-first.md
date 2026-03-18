## RAG-first rules

- Any recipe recommendation must go through retrieval first (Chroma).
- Direct generation without retrieval is forbidden, except fallback cases.
- If retrieval returns empty:
  - Ask the user for more constraints and return no recipes
  - Do not hallucinate recipes

## Ingestion rules

- Seed data lives under `backend/app/data/recipes_seed.json`.
- Ingestion script: `backend/scripts/ingest_recipes.py`.
- Chroma persist directory defaults to `backend/.chroma` and can be overridden via `CHROMA_PERSIST_DIR`.

