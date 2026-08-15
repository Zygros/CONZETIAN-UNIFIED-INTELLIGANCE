from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROV = ROOT / 'provenance'
EXPECTED = {
    'ARC-AGI', 'CZAOUA-UNITY-SYSTEM', 'Grossian_Scrolls', 'PHOENIX-PROTOCOL-ULTIMATE',
    'Sovereign-AGSI-Archive', 'Sovereign-Narrative-Intelligence-SNI-', 'ZAAI-SYSTEM',
    'ZYGROS-PRIME', 'agents', 'conzet-sovereign-intelligence', 'multi-ai-convergence-protocol',
    'omninet-v4', 'sovereign-agsi-portal', 'ultimate-phoenix-protocol',
    'ultimate-phoenix-protocol-ssi', 'we-omega', 'zyth-ultimate'
}
checks = []

def check(name: str, passed: bool, detail: str) -> None:
    checks.append({'name': name, 'passed': bool(passed), 'detail': detail})

source_root = ROOT / 'source-repositories'
actual = {p.name for p in source_root.iterdir() if p.is_dir()}
check('source_repository_count', actual == EXPECTED, f'expected={len(EXPECTED)} actual={len(actual)} missing={sorted(EXPECTED - actual)} extra={sorted(actual - EXPECTED)}')
check('root_readme', (ROOT / 'README.md').exists(), str(ROOT / 'README.md'))
check('architecture_doc', (ROOT / 'docs/architecture/INTEGRATION.md').exists(), str(ROOT / 'docs/architecture/INTEGRATION.md'))
check('claims_policy', (ROOT / 'docs/claims-and-evidence/README.md').exists(), str(ROOT / 'docs/claims-and-evidence/README.md'))
check('provenance_manifest', (PROV / 'unified-review-payload.json').exists(), str(PROV / 'unified-review-payload.json'))
check('private_boundary', 'private' in (ROOT / 'README.md').read_text(errors='replace').lower(), 'private visibility policy is documented')
check('no_nested_git', not any(p.is_dir() and p.name == '.git' for p in ROOT.rglob('.git')), 'nested Git metadata excluded')
for forbidden in ('node_modules', 'dist', 'build', '.next', '.cache', 'coverage', '__pycache__', 'vendor', 'target'):
    check(f'no_{forbidden}', not any(p.is_dir() and p.name == forbidden for p in ROOT.rglob(forbidden)), f'{forbidden} excluded from source import')

result = {'passed': all(x['passed'] for x in checks), 'checks': checks, 'summary': {'check_count': len(checks), 'passed_count': sum(x['passed'] for x in checks), 'failed_count': sum(not x['passed'] for x in checks), 'source_files': sum(1 for p in source_root.rglob('*') if p.is_file())}}
print(json.dumps(result, indent=2))
raise SystemExit(0 if result['passed'] else 1)
