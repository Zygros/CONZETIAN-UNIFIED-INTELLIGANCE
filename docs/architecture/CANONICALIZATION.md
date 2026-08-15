# Canonicalization and Provenance Index

The unified repository now exposes a derived, read-only canonical index under `provenance/canonical-index.json`, `provenance/canonical-index.jsonl`, and `provenance/canonical-index-summary.json`.

The index connects each approved local source record to a stable `canonical_id`, source ID, original path, source hash, normalized-text hash, evidence class, architectural layer, role hint, duplicate-review state, and candidate canonical path. It is a navigation and review layer; it does not replace or delete the source snapshots.

## Architectural layers

The current derived mapping separates documentation, services, applications, packages, archives, benchmarks, provenance, scripts, tests, and source snapshots. Repository-level role hints are preserved from the audited design: benchmarks, network and routing, agent runtime, core architecture, Phoenix and SSI, AGI archive and narrative, interfaces and portals, convergence, and ZAAI.

## Review states

The index uses `candidate`, `duplicate-review`, `normalized-review`, `approved-canonical`, `archived-variant`, and `rejected`. Exact duplicate content is a candidate for canonical indexing, not automatic deletion. Normalized duplicates require semantic review because formatting and metadata may be meaningful. Near duplicates require comparison of behavior, claims, license, dependencies, and history.

## Integrity boundary

All source paths and provenance records remain immutable. A future canonicalization pass may add indexes, aliases, and cross-links, but it must not silently overwrite the original repository snapshots. Every promoted implementation must pass license, dependency, test, link, and provenance checks.
