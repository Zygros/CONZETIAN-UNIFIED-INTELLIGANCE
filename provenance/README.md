# Provenance and Import Policy

This directory records how the unified repository was assembled from the 17 audited Zygros repositories.

## Source snapshot

The import uses the fixed scope and commit records in `github-scope.json` and `repo-audit.json`. Each source repository is preserved under `../source-repositories/<repository-name>/`. The original Git repositories were not modified by the import.

## Imported evidence

| File | Purpose |
|---|---|
| `github-scope.json` | Live repository scope, visibility, default branches, URLs, and update timestamps. |
| `repo-audit.json` | Per-repository commits, file counts, signals, README summaries, and reference findings. |
| `reference-graph.json` | Weighted cross-repository reference edges. |
| `monorepo-design.json` | Collision findings, duplicate groups, roles, layout, risks, and integration policy. |
| `unified-review-payload.json` | Consolidated machine-readable audit and design payload. |
| `unified-repository-proposal.md` | Review document that preceded repository creation. |

## Exclusions from source snapshots

Git metadata, dependency trees, generated build output, caches, coverage output, and common vendor directories were excluded from the imported source snapshots. The exclusions are recorded in the audit scripts and are intended to prevent nested repositories and generated dependencies from becoming part of the unified source tree.

## Visibility boundary

`sovereign-agsi-portal` was private in the source scope. The unified repository is also private. No content should be made public until the owner has reviewed private-source inclusion, secrets handling, source licenses, and publication scope.

## History boundary

This first import is a non-destructive snapshot import. It does not claim to preserve a single continuous Git history across all 17 repositories. Source commits are recorded in the audit and payload files. A future hybrid-history import may use Git subtree or provenance-preserving techniques after review.
