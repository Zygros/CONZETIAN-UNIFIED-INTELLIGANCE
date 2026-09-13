# Ecosystem Discovery — 2026-09-13

## Purpose

Append current external discoveries that materially affect the Ω-ECO design. These are **candidate inputs**, not imported or promoted code.

## Discovery 01 — Recursive self-improvement taxonomy

Repository: https://github.com/D2I-ai/awesome-recursive-self-improving-agents

Relevant taxonomy:

- harness-level self-improvement;
- memory self-improvement;
- skill/tool self-improvement;
- persistent changes derived from traces, evaluation feedback, and failures.

Integration target: map these categories into the Ω-ECO capability schema and HTC benchmark families.

Evidence state: `L1 specification/reference` until individual implementations are inspected and reproduced.

## Discovery 02 — Agent skill + memory interoperability

Repository: https://github.com/memoryplugin/agent-skills

Relevant design pattern:

- explicit long-term memory skill;
- targeted recall before assumption;
- atomic dated memories;
- session-start hooks;
- MCP-backed memory integration.

Integration target: compare against the Conzetian memory/Remembrance/Memory Anchor architecture without importing proprietary or incompatible internals.

Evidence state: `L1 specification/reference`.

## Discovery 03 — Hugging Face as a capability marketplace

Current Hugging Face Spaces exposes large numbers of runnable AI applications across model benchmarking, agent environments, code generation, OCR, document analysis, image/video generation, voice, and other categories. Some Spaces are explicitly surfaced as MCP or agent-capable applications.

Integration target: Ω-ECO should treat Hugging Face as a continuously changing **capability discovery substrate**, not a static model list.

Evidence state: `L1 current ecosystem observation`.

## Discovery 04 — Self-improving agent skill pattern

Repository: https://github.com/zhaono1/agent-playbook/tree/main/skills/self-improving-agent

Relevant pattern:

- multi-memory architecture;
- hooks before start / after completion / on error;
- self-correction based on skill experience;
- explicit pull-request review boundary for skill modifications.

Integration target: compare with the Conzetian skill lattice and Ω-EVO promotion model.

Evidence state: `L1 reference implementation` pending license, code, and benchmark review.

## Search-to-creation implication

The external landscape reinforces the same architecture direction discovered in the federation audit:

`memory + skills + tools + traces + evaluation + persistent provenance`

should be represented as one composable capability graph rather than isolated features.

The Ω-ECO runtime should therefore discover not only models, but:

- skills;
- memory systems;
- agent harnesses;
- tool protocols;
- MCP servers;
- benchmark environments;
- workflow generators;
- evaluation harnesses;
- executable scaffolds;
- datasets;
- Spaces/apps;
- provenance/evidence mechanisms.

## Promotion rule

External discovery never equals adoption. Each candidate must pass:

`license → provenance → security → compatibility → sandbox → benchmark → adversarial test → reproducibility → promotion`

This record is additive and does not claim that any external project is part of the Conzetian system yet.
