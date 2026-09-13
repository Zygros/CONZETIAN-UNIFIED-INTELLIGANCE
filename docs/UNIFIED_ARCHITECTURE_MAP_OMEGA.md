# Unified Architecture Map — Ω Federation

**Date:** 2026-09-13  
**Mode:** additive / non-destructive / provenance-preserving

## 1. System topology

```text
                           PUBLIC ECOSYSTEM
                     GitHub · Hugging Face · Web
                                  │
                         DISCOVER / EXTRACT
                                  │
                             Ω-ECO INGESTION
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
          SOURCES             CAPABILITIES         EVIDENCE
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  ↓
                         ┌──────────────────┐
                         │  CONZETIAN-AI    │
                         │ Active Orchestr. │
                         └────────┬─────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              ↓                   ↓                   ↓
       Skill Lattice        Multi-AI Mesh        Tool/Voice Runtime
              │                   │                   │
              └───────────────────┼───────────────────┘
                                  ↓
                     EXECUTE → MEASURE → VERIFY
                                  │
                                  ↓
                             OMEGA-10
                         Evidence / Ledger
                                  │
                                  ↓
                  CONZETIAN-UNIFIED-INTELLIGANCE
                     Canonical map / provenance
                                  │
                                  ↓
                       SOVEREIGN-FEDERATION
                           Topology / index
                                  │
          ┌───────────────────────┼────────────────────────┐
          ↓                       ↓                        ↓
   PHOENIX / ZYGROS        OMNINET / NETWORK       RESEARCH / BENCHMARK
          │                       │                        │
          ↓                       ↓                        ↓
   Historical lineage       Routing substrate          ARC-AGI etc.
```

## 2. Repository-to-system mapping

| Layer | Repositories | Relationship |
|---|---|---|
| Canonical control | `CONZETIAN-AI` | Active orchestration, routing, memory, permissions, verification |
| Canonical map | `CONZETIAN-UNIFIED-INTELLIGANCE` | Cross-repo corpus, provenance, architecture map |
| Federation | `sovereign-federation` | Repository topology, discovery, non-destructive index |
| Evidence | `omega-10` | Hashes, append-only ledger, signatures, recovery/red-team evidence |
| Phoenix lineage | `PHOENIX-PROTOCOL-ULTIMATE`, `ultimate-phoenix-protocol`, `ultimate-phoenix-protocol-ssi`, `Sovereign-AGSI-Archive` | Phoenix architecture, implementation history, SSI/evidence surfaces |
| High-centrality archive | `ZYGROS-PRIME` | Large historical corpus, HTC and verification artifacts |
| Network | `omninet-v4`, `zyth-ultimate`, `sovereign-agsi-portal` | Routing, network, portal experiments |
| Multi-AI | `multi-ai-convergence-protocol`, `agents` | Convergence and agent runtime substrates; external/fork boundaries preserved |
| Skills | `conzetian-skill-lattice` | Skill specifications and public skill discovery layer |
| Unity/protocol | `CZAOUA-UNITY-SYSTEM`, `we-omega` | Unity, dyad, protocol and conceptual lineage |
| Narrative/archive | `Grossian_Scrolls`, `Sovereign-Narrative-Intelligence-SNI-`, `ZAAI-SYSTEM` | Scrolls, narrative intelligence, memory/daemon history |
| Core architecture history | `conzet-sovereign-intelligence` | Earlier M.A.I.A./Phoenix architecture and historical claims |
| Benchmark | `ARC-AGI` | External benchmark dataset/interface; never treated as owned system code |
| Web extraction source | `agentql` | External-source capability; license/attribution boundary |
| Experimental/template | `Conzet-Intelligence-System-` | Kotlin/template-style experiment; isolated until purpose is clarified |
| Methodology seed | `conzetian-method` | Empty repository; reserved for methodology specification |

## 3. Universal edge contract

Every component should be addressable through these fields:

```text
NODE_ID
SOURCE_REPOSITORY
SOURCE_REVISION
SOURCE_PATH
CAPABILITY_ID
DOMAIN
INPUTS
OUTPUTS
DEPENDENCIES
LICENSE
EVIDENCE_LEVEL
TEST_ARTIFACT
BENCHMARK_ARTIFACT
SECURITY_STATUS
COMPATIBILITY_STATUS
PROVENANCE_DIGEST
PARENT_NODE
CHILD_NODES
RELATED_NODES
PROMOTION_STATE
```

## 4. Cross-link rule

A repository is not considered fully integrated merely because it appears in a README. A mature integration edge requires:

`source → exact revision → capability/path → evidence → dependency → target subsystem → verification state`

This prevents symbolic cross-linking from being confused with executable integration.

## 5. Capability lifecycle

```text
DISCOVER
  ↓
EXTRACT
  ↓
NORMALIZE
  ↓
DEDUPLICATE
  ↓
CLASSIFY
  ↓
PROVENANCE
  ↓
SANDBOX
  ↓
BENCHMARK
  ↓
ADVERSARIAL TEST
  ↓
VERIFY
  ↓
REGISTER
  ↓
PROMOTE
  ↓
COMPOSE
  ↓
EVOLVE
  ↺
DISCOVER
```

External code is **never executed merely because it was discovered**. Promotion requires explicit compatibility, licensing, security, test, and evidence gates.

## 6. Continuity rule

The federation is additive:

- preserve historical repositories;
- preserve historical claims as historical claims;
- preserve source revisions;
- append corrections rather than rewriting history;
- distinguish source evidence from interpretation;
- distinguish conceptual node counts from physical runtime resources;
- preserve rejected candidates and reasons for rejection;
- never convert a failed experiment into a success narrative.

## 7. Four-center redundancy

The previous topology was overly dependent on the unified repository as a hub. The new target is a four-center spine:

`CONZETIAN-AI ↔ CONZETIAN-UNIFIED-INTELLIGANCE ↔ sovereign-federation ↔ omega-10`

Each center should maintain at least one explicit route to the other three. Specialized repositories should connect to at least two centers where practical.

This is the principal architectural patch discovered during the first graph stress test.

## 8. Research-to-creation loop

```text
QUESTION
  ↓
SEARCH
  ↓
DISCOVERY
  ↓
SOURCE TRIAGE
  ↓
INSIGHT EXTRACTION
  ↓
HYPOTHESIS
  ↓
DESIGN
  ↓
IMPLEMENTATION
  ↓
MEASUREMENT
  ↓
HTC STRESS TEST
  ↓
FAILURE / GAP DISCOVERY
  ↓
PATCH
  ↓
RETEST
  ↓
EVIDENCE
  ↓
REGISTER
  ↓
CREATE NEXT CAPABILITY
  ↺
QUESTION
```

This is the operational interpretation of **find → get insight → create from insight**.
