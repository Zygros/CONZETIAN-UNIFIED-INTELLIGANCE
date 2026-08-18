# CONZETIAN-UNIFIED-INTELLIGANCE

**Unified repository for the Zygros AI systems ecosystem**

> **Canonical spelling note:** the repository name is retained for GitHub compatibility. Documentation uses **Conzetian Unified Intelligence** as the canonical project name.

This repository is the single review and navigation point for the 17 audited Zygros repositories. It combines their source snapshots, architecture references, cross-repository graph, provenance records, claims ledger, and integration plan without silently deleting or overwriting the original repositories.

> **Current status:** Private unified monorepo, imported from fixed source snapshots. Structural integration is complete for this initial import. Runtime unification, cross-package testing, licensing consolidation, and public release remain separate validation stages.

## Evidence boundary

This repository is an **integration/provenance workspace**, not a claim that every imported component is runtime-compatible or production-ready. Treat each capability according to its evidence level:

- **Implemented** — code exists in the source snapshot.
- **Tested** — a current, reproducible test run is recorded for the cited revision.
- **Benchmarked** — methodology, inputs, parameters, and output artifacts are available.
- **Verified** — independent reproduction or review is linked.
- **Designed** — architecture/specification exists without sufficient implementation evidence.
- **Historical** — preserved for provenance and not a current capability claim.

No repository-wide production, security, performance, or scientific claim should be inferred from the presence of source files alone.

## What is here

The repository is organized into four layers. `source-repositories/` preserves the complete audited source snapshots in one place. `docs/` explains the architecture, protocols, origin, and evidence boundaries. `provenance/` records repository scope, source commits, audit findings, the reference graph, and the monorepo design. `tests/` and `scripts/` contain integration checks and future validation tooling.

The source snapshots are intentionally kept under explicit repository names. This prevents collisions and preserves traceability while the canonical architecture is reviewed. The next integration stage can promote selected components into stable packages and services without losing the original source paths.

## Audited source repositories

| Source | Initial treatment |
|---|---|
| `ARC-AGI` | Benchmark and browser interface snapshot |
| `agents` | Agent runtime and tool foundation |
| `omninet-v4` | Routing and network architecture |
| `multi-ai-convergence-protocol` | Multi-AI orchestration and convergence |
| `sovereign-agsi-portal` | Private portal/interface snapshot |
| `ZAAI-SYSTEM` | ZAAI subsystem source |
| `PHOENIX-PROTOCOL-ULTIMATE` | Primary Phoenix protocol source |
| `ultimate-phoenix-protocol` | Phoenix variant and historical source |
| `ultimate-phoenix-protocol-ssi` | SSI architecture source |
| `zyth-ultimate` | Zyth interface/architecture source |
| `Sovereign-AGSI-Archive` | AGSI archive and architecture source |
| `Sovereign-Narrative-Intelligence-SNI-` | Narrative and symbolic intelligence source |
| `Grossian_Scrolls` | Narrative and historical archive |
| `conzet-sovereign-intelligence` | Core architecture source |
| `ZYGROS-PRIME` | High-centrality architecture source |
| `CZAOUA-UNITY-SYSTEM` | Unity, Chimera, and The 12 source |
| `we-omega` | Dyad and manifestation architecture source |

## Recommended reading order

1. Read this file for the system map and current status.
2. Read [`docs/architecture/INTEGRATION.md`](docs/architecture/INTEGRATION.md) for how the repositories flow together.
3. Read [`docs/claims-and-evidence/README.md`](docs/claims-and-evidence/README.md) before treating any performance or status claim as verified.
4. Inspect [`provenance/`](provenance/) for the exact audit snapshot, repository commits, and reference graph.
5. Explore [`source-repositories/`](source-repositories/) when you need the original source content.

## Proposed canonical evolution

The first import preserves source snapshots. The next staged evolution can introduce canonical paths such as:

```text
docs/architecture/       system maps and boundaries
docs/protocols/          Phoenix, SSI, convergence, and narrative protocols
services/agent-runtime/  agent runtime and tool interfaces
services/omninet/        routing and network components
services/convergence/    multi-AI orchestration
apps/portal/             portal and interface applications
packages/zaai/           ZAAI adapters and components
packages/narrative/      narrative and symbolic intelligence
benchmarks/arc-agi/      ARC-AGI benchmark boundary
archive/scrolls/         historical and narrative archives
provenance/              source snapshots, commits, and evidence
```

Those canonical paths should be populated only after component boundaries, licenses, dependencies, and tests are reviewed. Copying folders into a monorepo is not by itself proof that the components are runtime-compatible.

## Validation status

The source audit scanned 8,230 files and 4,461 text files across 17 repositories. It recorded 55 cross-repository reference edges, 509 common basename collisions, and 122 exact duplicate-content groups. Six repositories showed filename-level test evidence in the audit. These are **audit observations from the recorded snapshot**, not claims that the current tree passes all tests. Current integration status must be established from a dated test run or CI artifact.

### Suggested validation gate

Before promoting a component from snapshot to canonical runtime package, record:

1. source repository and exact commit SHA;
2. dependency/runtime versions;
3. test command and result;
4. benchmark fixture/data version, if applicable;
5. security/dependency review;
6. compatibility findings and known limitations;
7. resulting integration commit.

## Visibility and safety policy

This repository is private by default. The source repository `sovereign-agsi-portal` was private in the audit scope, so its content must not be published without an explicit visibility decision. Secrets, tokens, private credentials, and personal account data are not part of this import. The original repositories remain untouched by this unified-repository creation.

A root license has not been added automatically. Source license notices are preserved where present, and a consolidated license should be selected only after compatibility review.

## Provenance

The import was created from the fixed GitHub snapshot documented in [`provenance/github-scope.json`](provenance/github-scope.json). The complete audit and design payload is in [`provenance/unified-review-payload.json`](provenance/unified-review-payload.json).

**Owner:** Zygros  
**Repository:** `CONZETIAN-UNIFIED-INTELLIGANCE`  
**Integration mode:** Non-destructive, hybrid-provenance monorepo import

## S+ readiness

This repository is maintained under an additive, provenance-preserving quality rubric. See `SPLUS.md`, `SECURITY.md`, `LICENSE-STATUS.md`, and `docs/PROVENANCE.md` for boundaries and validation guidance. This status does not claim production correctness, legal clearance, or security certification.

## Install and usage

This repository may contain executable components, examples, benchmarks, or archived material. Use the native dependency manifest and project-specific instructions for the active component. For a non-runtime archive, inspect the documented provenance and evidence boundaries before treating files as executable.
