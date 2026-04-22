#!/usr/bin/env python3
"""
OpenAPI → Compact Format
Превращает огромный forum.json в компактный текст для скармливания LLM.
Оставляет только суть: путь, метод, параметры, body, scopes.

Usage:
    python compact_schema.py forum.json > schema_compact.txt
    python compact_schema.py forum.json --section threads > threads_only.txt
    python compact_schema.py forum.json --section threads,posts,users
"""

import json
import sys
import argparse
import re


def get_body_fields(operation):
    """Извлекает поля из requestBody."""
    rb = operation.get('requestBody', {})
    content = rb.get('content', {})
    fields = []
    for ct, spec in content.items():
        schema = spec.get('schema', {})
        props = schema.get('properties', {})
        required = schema.get('required', [])
        for name, prop in props.items():
            ptype = prop.get('type', '?')
            fmt = prop.get('format', '')
            if ptype == 'array':
                items_type = prop.get('items', {}).get('type', '?')
                ptype = f"array<{items_type}>"
            if fmt:
                ptype = f"{ptype}({fmt})"
            req = '*' if name in required else ''
            enum = prop.get('enum', [])
            examples = prop.get('examples', [])
            extra = ''
            if enum:
                extra = f" [{','.join(str(e) for e in enum)}]"
            elif examples:
                extra = f" [{','.join(str(e) for e in examples)}]"
            # Nested object
            if prop.get('type') == 'object' and 'properties' in prop:
                sub_fields = []
                for sn, sp in prop['properties'].items():
                    st = sp.get('type', '?')
                    sub_fields.append(f"{sn}:{st}")
                extra = f" {{{', '.join(sub_fields)}}}"
            fields.append(f"    {req}{name}: {ptype}{extra}")
    return fields


def get_scopes(operation):
    security = operation.get('security', [])
    scopes = []
    for sec in security:
        for key, vals in sec.items():
            scopes.extend(vals)
    return scopes


def resolve_param_ref(ref_str):
    name = ref_str.split('/')[-1]
    # Common param refs
    known = {
        'thread_id': ('thread_id', 'path', 'integer'),
        'user_id_path': ('user_id', 'path', 'integer'),
        'profile_post_id': ('profile_post_id', 'path', 'integer'),
        'post_id': ('post_id', 'path', 'integer'),
        'forum_id': ('forum_id', 'path', 'integer'),
        'category_id': ('category_id', 'path', 'integer'),
        'page_id': ('page_id', 'path', 'integer'),
        'notification_id': ('notification_id', 'path', 'integer'),
        'conversation_id': ('conversation_id', 'path', 'integer'),
        'message_id': ('message_id', 'path', 'integer'),
        'comment_id': ('comment_id', 'path', 'integer'),
        'link_id': ('link_id', 'path', 'integer'),
        'search_id': ('search_id', 'path', 'integer'),
        'tag_id': ('tag_id', 'path', 'integer'),
    }
    if name in known:
        return known[name]
    return (name, 'path', '?')


def format_param(p):
    """Форматирует один параметр в компактную строку."""
    name = p.get('name', '?')
    location = p.get('in', '?')
    schema = p.get('schema', {})
    ptype = schema.get('type', '?')
    fmt = schema.get('format', '')
    required = p.get('required', False)

    if ptype == 'array':
        items_type = schema.get('items', {}).get('type', '?')
        ptype = f"array<{items_type}>"

    if fmt:
        ptype = f"{ptype}({fmt})"

    enum = schema.get('enum', [])
    examples = schema.get('examples', [])
    extra = ''
    if enum:
        extra = f" [{','.join(str(e) for e in enum)}]"
    elif examples and len(examples) <= 8:
        extra = f" [{','.join(str(e) for e in examples)}]"

    req = '*' if required else ''
    loc = {'query': '?', 'path': ':', 'header': 'H'}[location]

    return f"    {req}{name}{loc} {ptype}{extra}"


def path_matches_section(path, section):
    """Проверяет принадлежит ли path к секции."""
    section = section.lower().strip('/')
    path_lower = path.lower().strip('/')
    # Direct match or starts with
    if path_lower.startswith(section):
        return True
    # Aliases
    aliases = {
        'threads': ['threads', 'contests', 'claims'],
        'users': ['users', 'account'],
        'profile-posts': ['profile-posts'],
        'profileposts': ['profile-posts'],
        'conversations': ['conversations'],
        'chatbox': ['chatbox'],
        'search': ['search'],
        'forums': ['forums'],
        'posts': ['posts'],
        'tags': ['tags'],
        'notifications': ['notifications'],
        'navigation': ['navigation'],
        'batch': ['batch'],
        'forms': ['forms'],
        'link-forums': ['link-forums'],
    }
    prefixes = aliases.get(section, [section])
    return any(path_lower.startswith(p) for p in prefixes)


def compact_schema(schema, sections=None):
    lines = []
    info = schema.get('info', {})
    lines.append(f"# {info.get('title', 'API')} v{info.get('version', '?')}")
    lines.append(f"# Base: {schema.get('servers', [{}])[0].get('url', '?')}")
    lines.append(f"# Legend: *=required ?=query :=path  body:=request body")
    lines.append(f"# Types: [enum_values]  array<type>  type(format)")
    lines.append("")

    paths = schema.get('paths', {})
    current_tag = None

    for path in sorted(paths.keys()):
        methods = paths[path]

        for method in ['get', 'post', 'put', 'delete', 'patch']:
            if method not in methods:
                continue

            op = methods[method]
            op_id = op.get('operationId', '')
            tags = op.get('tags', [])
            tag = tags[0] if tags else '?'

            # Filter by section
            if sections:
                matched = any(path_matches_section(path, s) for s in sections)
                if not matched:
                    continue

            # Tag header
            if tag != current_tag:
                if current_tag is not None:
                    lines.append("")
                lines.append(f"## {tag}")
                current_tag = tag

            scopes = get_scopes(op)
            scope_str = f"  [{','.join(scopes)}]" if scopes else ""

            lines.append(f"{method.upper()} {path}  # {op_id}{scope_str}")

            # Parameters
            params = op.get('parameters', [])
            has_params = False
            for p in params:
                if '$ref' in p:
                    name, loc, ptype = resolve_param_ref(p['$ref'])
                    req = '*'
                    lines.append(f"    {req}{name}: {ptype}")
                    has_params = True
                else:
                    # Skip fields_include/exclude
                    if p.get('name', '') in ('fields_include', 'fields_exclude'):
                        continue
                    lines.append(format_param(p))
                    has_params = True

            # Body
            body_fields = get_body_fields(op)
            if body_fields:
                if has_params:
                    lines.append("  body:")
                else:
                    lines.append("  body:")
                lines.extend(body_fields)

    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser(description='OpenAPI → Compact Format')
    parser.add_argument('schema', help='OpenAPI JSON file')
    parser.add_argument('--section', '-s', help='Filter by section(s), comma-separated: threads,posts,users')
    args = parser.parse_args()

    with open(args.schema, 'r', encoding='utf-8') as f:
        schema = json.load(f)

    sections = None
    if args.section:
        sections = [s.strip() for s in args.section.split(',')]

    result = compact_schema(schema, sections)
    print(result)

    # Stats
    line_count = len(result.split('\n'))
    print(f"\n# --- {line_count} lines ---", file=sys.stderr)


if __name__ == '__main__':
    main()