# Conzetian Unified Architecture

## Purpose

This document explains how the 17 source repositories are organized into one navigable system without claiming that every source component is already runtime-compatible or production-ready.

## System flow

```text
ZYGROS-PRIME and core architecture
        ↓
Phoenix, SSI, AGSI, Unity, Dyad, and narrative protocols
        ↓
ZAAI packages, multi-AI convergence, and orchestration
        ↓
Agent runtime and OmniNet routing/network services
        ↓
Portal, Zyth, and other user-facing interfaces
        ↓
ARC-AGI benchmark, validation, evidence, and feedback loop
```

The repository also contains an archive lane. Grossian Scrolls, AGSI archives, historical variants, and narrative materials remain accessible and cross-linked but are not treated as runtime services by default.

## Reference graph findings

The audit detected 55 weighted cross-repository reference edges. `ZYGROS-PRIME` is the strongest reference hub, with high-weight links to `Sovereign-AGSI-Archive`, `Grossian_Scrolls`, `ZAAI-SYSTEM`, `Sovereign-Narrative-Intelligence-SNI-`, `ultimate-phoenix-protocol-ssi`, `zyth-ultimate`, `conzet-sovereign-intelligence`, `multi-ai-convergence-protocol`, `ARC-AGI`, `agents`, `omninet-v4`, and `sovereign-agsi-portal`.

`PHOENIX-PROTOCOL-ULTIMATE` is the second major hub. It links into the AGSI archive, Grossian Scrolls, core intelligence, SSI, convergence, ZAAI, agents, Zyth, ARC-AGI, the Phoenix variant, and `ZYGROS-PRIME`. `omninet-v4` is the recurring network and routing destination, while `agents` is the clearest runtime-oriented anchor in the source set.

These links are currently evidence of textual or repository-level references. They are not automatically evidence of importable code dependencies, API compatibility, or successful runtime integration. The unified repository therefore treats the graph as an architecture map and a prioritization aid.

## Canonical layers

| Layer | Canonical location | Source repositories | Boundary |
|---|---|---|---|
| Architecture | `docs/architecture/` | `ZYGROS-PRIME`, `conzet-sovereign-intelligence`, `CZAOUA-UNITY-SYSTEM`, `we-omega` | Explanatory and design material. |
| Protocols | `docs/protocols/` | Phoenix, SSI, convergence, narrative, and Unity sources | Protocol definitions separated from claims. |
| Agent runtime | `services/agent-runtime/` | `agents` | Runtime dependencies and tools isolated. |
| Routing/network | `services/omninet/` | `omninet-v4` | Network behavior behind explicit interfaces. |
| Convergence | `services/convergence/` | `multi-ai-convergence-protocol` | Orchestration and multi-agent coordination. |
| Interfaces | `apps/portal/`, `apps/zyth/` | `sovereign-agsi-portal`, `zyth-ultimate` | User-facing applications and deployment boundaries. |
| Packages | `packages/zaai/`, `packages/narrative/` | `ZAAI-SYSTEM`, SNI | Reusable adapters and symbolic/narrative layer. |
| Benchmarks | `benchmarks/arc-agi/` | `ARC-AGI` | Data and evaluation boundary. |
| Archives | `archive/agi/`, `archive/scrolls/` | AGSI Archive, Grossian Scrolls | Historical and narrative material. |
| Evidence | `docs/claims-and-evidence/`, `tests/` | All sources | Validation, claims, provenance, and cross-package checks. |

## Integration rules

1. Preserve every source repository name, commit, and original path in provenance.
2. Do not merge files solely because their basenames match. The audit found 509 cross-repository basename collisions.
3. Do not deduplicate exact content without retaining source references. The audit found 122 exact duplicate-content groups.
4. Do not promote a README claim into a system guarantee without a reproducible test or clearly labeled evidence.
5. Keep private source material private unless the owner explicitly approves publication.
6. Keep benchmark data, archives, runtime services, and interfaces on separate dependency paths.
7. Add root-level smoke tests only after individual component boundaries are explicit.
8. Keep the original source snapshots available until the canonical implementation has passed review.

## Integration maturity levels

| Level | Meaning |
|---|---|
| Snapshot | Source content is imported and provenance is recorded. |
| Indexed | Source content is mapped, searchable, and cross-linked. |
| Canonical | One implementation or document is selected as primary. |
| Contracted | Interfaces, dependencies, and input/output contracts are explicit. |
| Tested | Local and cross-package tests pass. |
| Released | Visibility, licensing, security, and operational readiness are reviewed. |

The current repository begins at **Snapshot** and **Indexed** maturity. It should not be described as fully unified or production-ready until the canonical, contracted, tested, and released levels are reached for the relevant components.
