## Project structure rules

- Frontend lives under `frond/` (Taro + React + TypeScript).
- Backend lives under `backend/` (FastAPI + Python).
- Docs live under `doc/` and must be kept in sync with code changes.

### Frontend layering

- Pages: `frond/src/pages/*`
- Pure UI components: `frond/src/components/*` (no network calls)
- Stores: `frond/src/stores/*` (Zustand state + actions)
- API client: `frond/src/services/api.ts` (single source of HTTP)
- Types/contracts: `frond/src/types/*` (must reflect `doc/api.md`)

### Backend layering

- API layer: `backend/app/api/*` (routes only; minimal logic)
- Service layer: `backend/app/services/*` (business orchestration)
- AI layer: `backend/app/ai/*` (RAG, prompts, LLM, parsing, schema validation)
- Data layer: `backend/app/data/*` (sqlite/chroma/seed files)

