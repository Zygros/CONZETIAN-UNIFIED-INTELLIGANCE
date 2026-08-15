# Claims and Evidence

This repository contains ambitious architectural language and many README assertions. To keep the unified project credible, every significant statement should be assigned an evidence class.

| Evidence class | Meaning | Example treatment |
|---|---|---|
| `verified-local` | Reproduced by a local command, test, or file check in this repository. | Include the command and result. |
| `source-documented` | Stated in an imported source repository or README but not independently reproduced here. | Preserve attribution and label it as a source claim. |
| `self-reported` | Describes origin conditions or personal experience reported by the author. | Keep the statement, but do not present it as externally audited fact. |
| `design-hypothesis` | A proposed architecture, protocol, equation, or conceptual mechanism. | State the intended behavior and required experiment. |
| `unverified-performance` | A numerical, production, survival, valuation, AGI, or capability claim without reproduced evidence in this repository. | Do not repeat as a guarantee. |
| `blocked-or-deferred` | Cannot be assessed until access, licensing, dependencies, or tests are available. | Record the blocker and next action. |

## Minimum evidence record

Every important claim should record:

```text
claim_id:
claim:
evidence_class:
source_repository:
source_path:
source_commit:
verification_command:
verification_result:
limitations:
next_action:
```

## Current limitations

The audit found test-file evidence in only 6 of 17 source repositories. The initial unified import is therefore a structural and provenance integration, not a complete runtime validation. The imported source repositories also use different histories, dependency assumptions, and license signals. A root license and production-readiness declaration are intentionally deferred.
