# Conzetian AI Orchestrator Integration

`CONZETIAN-UNIFIED-INTELLIGANCE` is the source and provenance plane. `CONZETIAN-AI` is the orchestration plane. The canonical index is the read-only bridge between them.

```text
source snapshots and approved artifacts
            ↓
provenance/canonical-index.jsonl
            ↓
Conzetian AI data/canonical-index.jsonl
            ↓
retrieval hits with canonical_layer and canonical_status
            ↓
plan → swarm advice → provider adapter → verification → audit
```

The integration is intentionally additive. It does not merge or delete source snapshots. The canonical index records duplicate-review and normalized-review states so the orchestrator can surface uncertainty rather than silently choosing one document.

The current deployment mode is validated local dry-run execution. Provider-backed execution and live hosting remain separately gated by credentials, network policy, monitoring, and production-readiness review.
