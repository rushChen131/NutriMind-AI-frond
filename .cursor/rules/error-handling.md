## Error handling rules

- Backend endpoints should return stable JSON shapes on success; errors should be actionable and user-safe.
- `/chat` must not crash the server on LLM/RAG failures:
  - Retry 1 time for transient failures
  - Fallback to safe response when still failing
- Persisted data operations should rollback on conflict errors and keep the service available.

