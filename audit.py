#!/usr/bin/env python3
"""
Аудит модуля BAS vs OpenAPI схема.
Проверяет _code.js и engine.js на соответствие параметрам из схемы.

Usage:
    python audit.py --module-dir . --schema forum.json
"""
import json, os, re, sys, argparse

# Import codegen helpers
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from codegen import (parse_endpoints, get_existing_actions, operation_id_to_action_name,
                     get_engine_path, CUSTOM_OP_MAP, SKIP_PARAMS, snake_to_camel,
                     filter_params)


def parse_code_js(filepath):
    """Parse _code.js: extract engine path and param names."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return None, set()

    # Engine path: _call_function(_LZTAPI.xxx.yyy, {
    m = re.search(r'_call_function\(_LZTAPI\.([^,]+)', content)
    engine_path = m.group(1).strip() if m else None

    # Params: name: (<%= name %>)
    skip = {'variable', 'timeout', 'interval', 'maxTime'}
    params = set(re.findall(r'<%=\s*(\w+)\s*%>', content)) - skip
    return engine_path, params


def parse_engine_method(engine_js, method_path):
    """Find engine method and extract its params from cleanObject calls."""
    # Try to find the method in engine.js
    # Method path like __Threads.hide -> look for pattern
    parts = method_path.split('.')
    # This is complex to parse reliably, so we'll look for cleanObject near the path
    # For now return None to indicate "check manually"
    return None


def get_schema_params(ep):
    """Get query + body param names from endpoint."""
    names = set()
    for p in ep['params']:
        if p['name'] not in SKIP_PARAMS and p.get('in') != 'path':
            names.add(p['name'])
    for p in ep['body_params']:
        if p['name'] not in SKIP_PARAMS and p.get('schema', {}).get('format') != 'binary':
            names.add(p['name'])
    return names


def get_schema_params_with_path(ep):
    """Get all param names including path (in camelCase)."""
    names = set()
    for p in ep['params']:
        if p['name'] not in SKIP_PARAMS:
            if p.get('in') == 'path':
                names.add(snake_to_camel(p['name']))
            else:
                names.add(p['name'])
    for p in ep['body_params']:
        if p['name'] not in SKIP_PARAMS:
            names.add(p['name'])
    return names


def find_code_file(module_dir, action_name, manifest):
    """Find _code.js file for action."""
    for a in manifest.get('actions', []):
        if a['name'] == action_name:
            for c in a.get('code', []):
                path = os.path.join(module_dir, c['file'])
                if os.path.exists(path):
                    return path
    # Fallback search
    for root, _, files in os.walk(module_dir):
        fname = f"{action_name}_code.js"
        if fname in files:
            return os.path.join(root, fname)
    return None


def main():
    parser = argparse.ArgumentParser(description='Audit BAS module vs OpenAPI')
    parser.add_argument('--module-dir', default='.', help='Module directory')
    parser.add_argument('--schema', required=True, help='OpenAPI JSON')
    args = parser.parse_args()

    with open(args.schema, 'r', encoding='utf-8') as f:
        schema = json.load(f)

    endpoints = parse_endpoints(schema)
    existing, manifest = get_existing_actions(args.module_dir)

    # Build action->endpoint map
    action_eps = {}
    for ep in endpoints:
        action = operation_id_to_action_name(ep['operation_id'], ep['method'])
        if action and action in existing:
            action_eps[action] = ep

    issues = []
    ok_count = 0

    for action_name in sorted(existing):
        ep = action_eps.get(action_name)
        if not ep:
            continue  # NEW or REMOVED — handled by codegen diff

        code_path = find_code_file(args.module_dir, action_name, manifest)
        if not code_path:
            issues.append(('MISSING_FILE', action_name, '_code.js not found'))
            continue

        engine_path_actual, code_params = parse_code_js(code_path)
        engine_path_expected = get_engine_path(ep['operation_id'])
        schema_params = get_schema_params_with_path(ep)

        action_issues = []

        # Check engine path
        if engine_path_expected and engine_path_actual:
            if engine_path_actual != engine_path_expected:
                action_issues.append(
                    f"ENGINE_PATH: has '{engine_path_actual}' expected '{engine_path_expected}'")

        # Check params: what's in schema but missing from _code.js
        # Binary params like avatar/background are special — skip them
        binary_params = {p['name'] for p in ep['body_params']
                         if p.get('schema', {}).get('format') == 'binary'}

        missing_in_code = schema_params - code_params - binary_params
        extra_in_code = code_params - schema_params

        # Filter out path params in both forms
        path_param_forms = set()
        for p in ep['params']:
            if p.get('in') == 'path':
                path_param_forms.add(p['name'])
                path_param_forms.add(snake_to_camel(p['name']))

        extra_in_code = extra_in_code - path_param_forms

        if missing_in_code:
            action_issues.append(f"MISSING_PARAMS in _code.js: {', '.join(sorted(missing_in_code))}")
        if extra_in_code:
            action_issues.append(f"EXTRA_PARAMS in _code.js: {', '.join(sorted(extra_in_code))}")

        # Check method
        # (can't easily determine from _code.js, but engine check covers it)

        if action_issues:
            issues.append(('ISSUES', action_name, action_issues))
        else:
            ok_count += 1

    # Output
    print(f"{'='*60}")
    print(f"  AUDIT RESULTS")
    print(f"  OK:     {ok_count}")
    print(f"  ISSUES: {len(issues)}")
    print(f"{'='*60}")

    if issues:
        for issue_type, name, details in issues:
            if issue_type == 'MISSING_FILE':
                print(f"\n  [!] {name}: {details}")
            else:
                print(f"\n  [~] {name}:")
                for d in details:
                    print(f"      {d}")

    print()


if __name__ == '__main__':
    main()