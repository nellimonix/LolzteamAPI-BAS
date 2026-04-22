# LOLZTEAM API BAS Module — Кодогенератор v2

## Что это

Python-скрипт для автоматической генерации/обновления файлов модуля BAS (Browser Automation Studio) из OpenAPI-схемы LOLZTEAM Forum API. Учитывает все специфические паттерны и костыли оригинального модуля.

## Возможности

- **diff** — показать новые эндпоинты, которых нет в модуле
- **generate** — сгенерировать файлы для новых эндпоинтов (не трогает существующие)
- **update** — то же + бекапы существующих файлов

### Поддержка BAS-специфичных паттернов

- `post_body`/`message_body`/`comment_body` → textarea виджет с replace_linebreaks
- `reply_group` → цветные HTML variants с группами доступа
- Boolean параметры → checkbox + конвертация в 0/1 в engine
- `watch_thread`/`watch_thread_email` → visible_if_checked от `watch_thread_state`
- `prefix_ids`/`tags` → comma-separated split паттерн в engine
- Path-параметры → camelCase (thread_id → threadId)
- Стандартный блок "Requests delivery" (timeout/interval/maxTime)
- Зелёные кнопки OK/Back в стиле LOLZTEAM

## Установка

Скрипт на чистом Python 3, без зависимостей.

```bash
# Скачай OpenAPI-схему
curl -L "https://raw.githubusercontent.com/AS7RIDENIED/LOLZTEAM/main/Official%20Documentation/forum.json" -o forum.json
```

## Использование

### 1. Посмотреть что нового в API

```bash
python3 codegen.py --schema forum.json --module-dir /path/to/module --mode diff
```

Выведет список новых эндпоинтов и создаст `CHANGELOG.txt`.

### 2. Сгенерировать файлы для новых эндпоинтов

```bash
python3 codegen.py --schema forum.json --module-dir /path/to/module --mode generate --output-dir ./generated
```

Создаст в `./generated/`:
- `src/` — файлы `_code.js`, `_interface.js`, `_select.js` для каждого нового action
- `new_manifest_actions.json` — записи для добавления в `manifest.json` → `actions`
- `new_engine_methods.js` — методы для добавления в `engine.js`
- `new_translations.json` — ключи переводов для `manifest.json` → `localize`
- `CHANGELOG.txt` — список изменений

### 3. Обновить модуль (с бекапами)

```bash
python3 codegen.py --schema forum.json --module-dir /path/to/module --mode update --output-dir ./generated
```

## Что генерируется для каждого эндпоинта

Тройка файлов BAS:

| Файл | Описание |
|------|----------|
| `lztapi_xxx_code.js` | Шаблон кода с `_call_function`, `_result_function()` |
| `lztapi_xxx_interface.js` | HTML-интерфейс с `input_constructor`, `block_start/end`, чекбоксами |
| `lztapi_xxx_select.js` | Валидация параметров + генерация кода через `_.template` |

## Кастомизация

### Добавить свои описания (ru)

В `new_manifest_actions.json` замени `[TODO]` на русские описания:
```json
"description": {
    "en": "Hide Thread",
    "ru": "Скрыть тему из ленты"
}
```

### Кастомный маппинг operationId

В начале `codegen.py` есть словарь `CUSTOM_OP_MAP`:
```python
CUSTOM_OP_MAP = {
    "Threads.Hide": ("lztapi_hide_thread", "__Threads.hide", "Hide thread.", "Скрыть тему"),
    "SomeNew.Operation": None,  # skip - не генерировать
}
```

### Паттерны, которые сохраняются

- ✅ BAS-специфичный синтаксис (`_call_function`, `_arguments()`, `_function_return`, `!`)
- ✅ Разделение обязательных/необязательных параметров (Options спойлер)
- ✅ Блок "Requests delivery" с timeout/interval/maxTime
- ✅ Стилизация кнопок (зелёный OK, красный Back)
- ✅ Переводы через `tr()`
- ✅ camelCase для path-параметров (`thread_id` → `threadId`)
- ✅ Валидация обязательных полей в select.js
- ✅ enum → variants в interface.js
- ✅ boolean → checkbox
- ✅ Корректные scopes из security

## Workflow обновления модуля

```
1. Скачать свежую forum.json
2. python3 codegen.py --schema forum.json --module-dir . --mode diff
3. Посмотреть CHANGELOG.txt — что нового
4. python3 codegen.py --schema forum.json --module-dir . --mode generate --output-dir ./new
5. Ревью сгенерированных файлов
6. Добавить ru-переводы в new_translations.json
7. Копировать файлы из new/src/ в модуль
8. Вручную добавить записи в manifest.json и engine.js
9. Тест в BAS
```
