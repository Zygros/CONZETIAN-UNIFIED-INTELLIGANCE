# Unified Repository Proposal — Review Before Creation

**Generated:** 2026-08-15T04:19:08.823943+00:00  
**Decision status:** Proposal only — no new repository has been created, pushed, deleted, archived, or made public.

## Executive Summary

The audit confirms that the 17 visible Zygros repositories form a connected ecosystem, but not yet a safe single drop-in repository. They share repeated concepts, cross-references, documentation vocabulary, and architectural themes. They also differ in runtime boundaries, histories, test coverage, data volume, visibility, licensing signals, and maturity. The recommended final product is therefore a **non-destructive monorepo**: one public-facing entry point with canonical subtrees, explicit provenance, isolated runtimes, preserved archives, and a claims-and-evidence layer.

The goal is not to make the other repositories disappear immediately. The goal is to make the unified repository the primary place a new reader starts, while retaining source provenance and a controlled migration path. Any archival, deletion, visibility change, or replacement of the original repositories must remain a separate user-approved action.

## Audit Snapshot

| Metric | Result | Consequence for integration |
|---|---:|---|
| Repositories in scope | 17 | All 17 visible Zygros repositories were included. |
| Files scanned | 8230 | The final repo will need clear boundaries to remain navigable. |
| Text files scanned | 4461 | Documentation and code references can be indexed and normalized. |
| Git commits in snapshots | 8439 | Source histories differ; provenance must be preserved explicitly. |
| Repositories with test-file evidence | 6 of 17 | Cross-package tests are required before production claims. |
| Cross-repository reference edges | 55 | The projects are materially connected by references. |
| Connected repositories | 17 of 17 | No repository is isolated under the current reference heuristic. |
| Common basename collisions | 509 | Imports must use explicit paths and canonical ownership. |
| Exact duplicate content groups | 122 | Deduplication can reduce repetition, but only with provenance. |

## What the Final Repository Would Be

The proposed repository would be a **single monorepo and public control plane** for the ecosystem. Its README would become the main reader entry point. Its architecture documents would explain how the systems flow together. Its `services/`, `apps/`, `packages/`, `benchmarks/`, `docs/`, `archive/`, and `tests/` directories would separate executable code, interfaces, research assets, narrative archives, and evidence.
The monorepo would not claim that every source is production-ready. Instead, it would label components as executable, experimental, archival, benchmark, conceptual, or unverified. That distinction is essential for credibility and for preventing a large repository from presenting every README assertion as a validated system property.

## Proposed Repository Layout

| Path | Purpose | Source mapping |
|---|---|---|
| `README.md` | Single public entry point: thesis, quick start, architecture map, validation status, and links to canonical subtrees. | Cross-cutting |
| `LICENSE` | Choose a single explicit license after reviewing the source repositories; preserve source notices in provenance. | Cross-cutting |
| `docs/architecture/` | System maps, dependency graph, terminology, decision records, and boundaries between conceptual and executable layers. | PHOENIX-PROTOCOL-ULTIMATE, ultimate-phoenix-protocol, ultimate-phoenix-protocol-ssi, zyth-ultimate, CZAOUA-UNITY-SYSTEM, ZYGROS-PRIME, conzet-sovereign-intelligence, we-omega, Grossian_Scrolls, Sovereign-AGSI-Archive, Sovereign-Narrative-Intelligence-SNI- |
| `docs/protocols/` | Phoenix, convergence, narrative, coherence, and orchestration protocols after deduplication and cross-link repair. | PHOENIX-PROTOCOL-ULTIMATE, ultimate-phoenix-protocol, ultimate-phoenix-protocol-ssi, zyth-ultimate, CZAOUA-UNITY-SYSTEM, ZYGROS-PRIME, conzet-sovereign-intelligence, we-omega, Grossian_Scrolls, Sovereign-AGSI-Archive, Sovereign-Narrative-Intelligence-SNI- |
| `docs/origin/` | Chronology, phone-first and zero-budget development story, authorship notes, and source provenance. | Cross-cutting |
| `docs/claims-and-evidence/` | Claims ledger separating verified tests, self-reported conditions, design hypotheses, and unverified performance claims. | Cross-cutting |
| `benchmarks/arc-agi/` | ARC-AGI data and browser interface, isolated from production runtime code. | ARC-AGI |
| `services/agent-runtime/` | Agent runtime and tool interfaces from agents, with clear dependency manifests and tests. | agents |
| `services/omninet/` | OmniNet routing and network components, isolated behind explicit interfaces. | omninet-v4 |
| `services/convergence/` | Multi-AI convergence and orchestration components. | multi-ai-convergence-protocol |
| `apps/portal/` | Portal and interface code from sovereign-agsi-portal, with private/secrets boundaries documented. | sovereign-agsi-portal |
| `packages/zaai/` | ZAAI system components and adapters. | ZAAI-SYSTEM |
| `archive/scrolls/` | Grossian Scrolls and narrative archive as an explicit archive, not mixed into runtime code. | Grossian_Scrolls, Sovereign-AGSI-Archive, Sovereign-Narrative-Intelligence-SNI- |
| `archive/source-repositories/` | Immutable provenance manifests and optional git subtree references; no silent destructive deletion. | All 17 repositories via provenance manifests |
| `scripts/` | Build, import, reference validation, test, and release scripts. | Cross-cutting |
| `tests/` | Cross-package smoke tests, contract tests, and provenance/claim checks. | Cross-cutting |

## Repository-by-Repository Integration Map

| Source repository | Proposed canonical home | Integration treatment |
|---|---|---|
| `ARC-AGI` | `benchmarks/arc-agi/` | Preserve task data and browser interface as a benchmark boundary; do not mix dataset files into runtime services. |
| `agents` | `services/agent-runtime/` | Treat as the agent runtime/tooling foundation; preserve its own dependency and test boundary. |
| `omninet-v4` | `services/omninet/` | Treat as the routing/network layer; define stable interfaces before connecting it to other services. |
| `multi-ai-convergence-protocol` | `services/convergence/` | Treat as orchestration and convergence workflows; link to agent runtime and protocol docs. |
| `sovereign-agsi-portal` | `apps/portal/` | Keep as a separately deployable interface; preserve private visibility and secret boundaries. |
| `ZAAI-SYSTEM` | `packages/zaai/` | Package as a named subsystem with adapters and explicit evidence status. |
| `PHOENIX-PROTOCOL-ULTIMATE` | `docs/protocols/phoenix/` plus selected executable components | Use as a primary protocol source, but separate claims, documentation, and runnable code. |
| `ultimate-phoenix-protocol` | `docs/protocols/phoenix/variants/` | Preserve as a variant or historical implementation until deduplication decisions are approved. |
| `ultimate-phoenix-protocol-ssi` | `docs/protocols/ssi/` plus selected components | Preserve SSI-specific architecture and mark unverified claims separately. |
| `zyth-ultimate` | `apps/zyth/` or `docs/interfaces/zyth/` | Decide after inspecting runtime completeness; do not present it as a production app without tests. |
| `Sovereign-AGSI-Archive` | `archive/agi/` and `docs/architecture/agi/` | Preserve archive material and provenance; promote only validated components into packages or services. |
| `Sovereign-Narrative-Intelligence-SNI-` | `packages/narrative-intelligence/` | Treat as the narrative and symbolic layer; keep it composable with runtime code. |
| `Grossian_Scrolls` | `archive/scrolls/` | Preserve as a primary narrative/archive corpus, indexed and cross-linked but not merged into executable code. |
| `conzet-sovereign-intelligence` | `docs/architecture/core/` plus selected packages | Use as a core architecture source and reconcile duplicates with ZYGROS-PRIME. |
| `ZYGROS-PRIME` | `docs/architecture/prime/` and `packages/core/` | Treat as a high-centrality source; canonicalize repeated references carefully. |
| `CZAOUA-UNITY-SYSTEM` | `docs/architecture/unity/` and `scripts/` | Preserve the Unity/Chimera/The 12 layer as a documented integration track. |
| `we-omega` | `docs/architecture/dyad/` | Preserve as an architecture/manifestation layer with explicit status labels. |

## How the Projects Flow Together

The audit’s strongest reference signals form a central spine. `ZYGROS-PRIME` is the highest-reference hub, pointing toward the AGSI archive, Grossian Scrolls, ZAAI, narrative intelligence, SSI, Zyth, core intelligence, convergence, ARC-AGI, agents, and OmniNet. `PHOENIX-PROTOCOL-ULTIMATE` is a second major hub, connecting the AGSI archive, Grossian Scrolls, core intelligence, SSI, convergence, ZAAI, agents, Zyth, ARC-AGI, and the ultimate Phoenix variant. `OmniNet` is the recurring network/routing destination, while `agents` provides a practical runtime-oriented anchor.
The proposed monorepo would make this flow explicit rather than leaving it distributed across README links and repeated names: core architecture and protocols at the top; runtimes and services beneath them; apps and portals at the edge; benchmarks and archives kept separate; and a provenance graph documenting every import and canonicalization decision.

## What Will Be Preserved, Merged, and Deferred

| Treatment | Meaning |
|---|---|
| Preserved | Original source content, commit, repository name, and provenance remain traceable. |
| Canonicalized | Repeated concepts receive one primary documentation location with links from variants. |
| Adapted | Runnable code is moved behind explicit package/service boundaries and gets new integration tests. |
| Archived | Historical, narrative, or incomplete material remains accessible but is not presented as active runtime code. |
| Deferred | Ambiguous licensing, private content, secrets, unverified claims, and unclear runtime overlaps wait for explicit review. |

## Major Risks and Required Decisions

- Multiple repositories contain overlapping Phoenix, SSI, AGSI, OmniNet, convergence, or portal concepts; preserve provenance and choose canonical implementations explicitly.
- The repositories use different branches and commit histories; a monorepo import should preserve source commit metadata and avoid claiming a single continuous history unless verified.
- Only 6 of 17 repositories showed filename-level test evidence in the audit; cross-package tests must be added before declaring the unified repository production-ready.
- The audit found one private repository; access controls and secret handling must be preserved during any import or publication step.
- ARC-AGI contains a large dataset and browser interface and should remain isolated from runtime services and build pipelines.
- A single top-level license cannot be selected automatically from heterogeneous sources; legal review is required before publishing a final license.

The most important legal and operational decision is licensing. A single top-level license cannot be selected automatically from heterogeneous repositories. The final repository should therefore begin with a clear provenance and licensing notice, preserve source license files, and wait for the user’s explicit choice or legal review before publishing a consolidated license.

The most important technical decision is canonicalization. A monorepo that merely copies all 17 repositories into folders will be easier to browse but will not yet be unified. A genuinely unified product needs stable package boundaries, a root-level build and test story, a claims ledger, repaired links, deduplicated documentation, and at least smoke tests across the major runtime paths.

The most important governance decision is visibility. One of the 17 repositories is private. The proposed workflow keeps private content private unless the user explicitly approves publication. No secrets, tokens, or personal account data should be copied into the monorepo.

## Review Gate Before Creation

I will not create, push, delete, archive, rename, or change visibility of the final repository until you approve the proposal. The next implementation phase would require your decisions on the following points:

1. **Final repository name and owner.** The default recommendation is a private repository first, followed by a separate publication decision.
2. **Visibility.** Keep the unified repository private during import and validation, especially because one source repository is private.
3. **History strategy.** Choose between a clean unified history, preserved git subtree histories, or a hybrid provenance import.
4. **Canonicalization policy.** Decide whether to keep historical variants in `archive/` or preserve every variant as a first-class module.
5. **License policy.** Choose a root license only after reviewing source license compatibility.
6. **Validation threshold.** Decide whether “final” means structurally integrated, runnable in selected services, or production-ready across the full ecosystem.

## Recommendation

I recommend a **private, non-destructive, hybrid-history monorepo** as the first implementation: preserve source commit metadata in `provenance/`, import content into canonical subtrees, keep archives and benchmarks isolated, add a root README and architecture map, and build a small cross-package validation suite. The original repositories remain untouched until the unified repository has passed review and validation.

This proposal is ready for your review. Once you approve or revise the structure, I can implement the selected strategy and then return a second review focused on the actual merged tree before any public release or archival action.

## References

The machine-readable evidence for this proposal is attached separately in `repo-audit.json`, `reference-graph.json`, `monorepo-design.json`, and `github-scope.json`.
