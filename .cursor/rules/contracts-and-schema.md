## Contract-first rules

- The canonical API contract is `doc/api.md`.
- Backend Pydantic models under `backend/app/models/*` must match `doc/api.md`.
- Frontend DTO types under `frond/src/types/api.ts` must match `doc/api.md`.
- When changing an endpoint, update:
  - `doc/api.md`
  - backend models/handlers
  - frontend types/client usage

## LLM output schema rules

- LLM outputs must be parsed into JSON then validated with Pydantic schema.
- If parsing fails or schema validation fails:
  - Retry exactly once
  - Then fallback with a safe message and an empty `recipes` list

