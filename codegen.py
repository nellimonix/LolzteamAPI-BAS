#!/usr/bin/env python3
"""
LOLZTEAM API BAS Module Code Generator v2
==========================================
Парсит OpenAPI схему и генерирует/обновляет файлы модуля BAS.
Учитывает все костыли и паттерны оригинального модуля llimonix.

Использование:
    python3 codegen.py --schema forum.json --module-dir ./module --mode diff
    python3 codegen.py --schema forum.json --module-dir ./module --mode generate
    python3 codegen.py --schema forum.json --module-dir ./module --mode update
"""

import json
import os
import sys
import re
import shutil
import argparse
from datetime import datetime
from copy import deepcopy

# =============================================================================
# КОНФИГ: Какие параметры рендерить особым образом
# =============================================================================

# Параметры с textarea (многострочный ввод)
TEXTAREA_PARAMS = {
    'post_body', 'message_body', 'comment_body', 'message',
}

# Параметры-чекбоксы (boolean) с visible_if зависимостями
CHECKBOX_VISIBLE_IF = {
    'watch_thread': {'visible_if_checked': 'watch_thread_state'},
    'watch_thread_email': {'visible_if_checked': 'watch_thread_state'},
}

# Параметры, которые нужно конвертировать из true/false в 1/0 в engine
BOOL_TO_INT_PARAMS = {
    'post', 'alert', 'email', 'watch_thread_state', 'watch_thread',
    'watch_thread_email', 'apply_thread_prefix',
}

# Параметры-массивы, которые в BAS передаются через запятую и split(',')
COMMA_SPLIT_PARAMS = {
    'prefix_ids': 'prefix_id[]',
    'tags': None,  # tags остаётся как есть
    'response_ids': 'response_ids[]',
    'prize_data_places': 'prize_data_places[]',
    'secondary_group_ids': 'secondary_group_ids[]',
}

# reply_group — специальные variants с цветными описаниями
REPLY_GROUP_VARIANTS = [
    '0<br/><span style=\'color:rgb(43, 173, 114)\'>" + tr("Only staff members and curators can reply in thread.") + "</span>',
    '2<br/><span style=\'color:rgb(43, 173, 114)\'>" + tr("Everyone can reply in thread.") + "</span>',
    '21<br/><span style=\'color:rgb(43, 173, 114)\'>" + tr("Local and higher can reply in thread.") + "</span>',
    '22<br/><span style=\'color:rgb(43, 173, 114)\'>" + tr("Resident or higher can reply in thread.") + "</span>',
    '23<br/><span style=\'color:rgb(43, 173, 114)\'>" + tr("Expert or higher can reply in thread.") + "</span>',
    '60<br/><span style=\'color:rgb(43, 173, 114)\'>" + tr("Guru and higher can reply in thread.") + "</span>',
    '351<br/><span style=\'color:rgb(43, 173, 114)\'>" + tr("Artificial Intelligence and higher can reply in thread.") + "</span>',
]

# Параметры с примерами (examples)
PARAM_EXAMPLES = {
    'prefix_ids': [
        {'code': '493'},
        {'code': '495'},
        {'code': '493,495', 'desc_key': 'Specify multiple prefix IDs.'}
    ],
    'tags': [
        {'code': 'steam'},
        {'code': 'bas'},
        {'code': 'steam,bas', 'desc_key': 'Specify multiple tags.'}
    ],
    'response_ids': [
        {'code': '1'},
        {'code': '2'},
        {'code': '1,2', 'desc_key': 'Specify multiple response IDs.'}
    ],
}

# Файловые параметры (binary upload → base64 в BAS)
FILE_PARAMS = {'avatar', 'background'}

# Параметры, пропускаемые при генерации (технические OpenAPI)
SKIP_PARAMS = {'fields_include', 'fields_exclude', 'locale'}

# =============================================================================
# КОНФИГ: action_name → папка в src/
# Для новых действий, не указанных тут, путь вычисляется автоматически
# =============================================================================
FOLDER_MAP = {
    "lztapi_settings": "settings",
    "lztapi_get_categories": "categories/list",
    "lztapi_get_category": "categories/get",
    "lztapi_get_forums": "forums/list",
    "lztapi_get_forum": "forums/get",
    "lztapi_get_forums_grouped": "forums/grouped",
    "lztapi_get_feed_options": "forums/feed/get",
    "lztapi_edit_feed_options": "forums/feed/edit",
    "lztapi_get_followers": "forums/followers",
    "lztapi_get_followed_forums": "forums/followed",
    "lztapi_follow_forum": "forums/follow",
    "lztapi_unfollow_forum": "forums/unfollow",
    "lztapi_get_link_forums": "link-forums/list",
    "lztapi_get_link_forum": "link-forums/get",
    "lztapi_get_pages": "pages/list",
    "lztapi_get_page": "pages/get",
    "lztapi_get_threads": "threads/list",
    "lztapi_get_thread": "threads/get",
    "lztapi_create_thread": "threads/create",
    "lztapi_edit_thread": "threads/edit",
    "lztapi_delete_thread": "threads/delete",
    "lztapi_bump_thread": "threads/bump",
    "lztapi_move_thread": "threads/move",
    "lztapi_hide_thread": "threads/hide",
    "lztapi_bookmark_thread": "threads/star",
    "lztapi_unbookmark_thread": "threads/unstar",
    "lztapi_follow_thread": "threads/follow",
    "lztapi_unfollow_thread": "threads/unfollow",
    "lztapi_get_followed_threads": "threads/followed",
    "lztapi_get_thread_followers": "threads/followers",
    "lztapi_get_unread_threads": "threads/unread",
    "lztapi_get_recent_threads": "threads/recent",
    "lztapi_create_contest": "threads/create/contests",
    "lztapi_finish_contest": "threads/finish-contest",
    "lztapi_create_arbitrage": "threads/create/arbitrage",
    "lztapi_get_poll": "threads/poll/get",
    "lztapi_vote_poll": "threads/poll/vote",
    "lztapi_get_posts": "posts/list",
    "lztapi_get_post": "posts/get",
    "lztapi_create_post": "posts/create",
    "lztapi_edit_post": "posts/edit",
    "lztapi_delete_post": "posts/delete",
    "lztapi_like_post": "posts/like",
    "lztapi_unlike_post": "posts/unlike",
    "lztapi_report_post": "posts/report",
    "lztapi_get_post_likes": "posts/likes",
    "lztapi_get_post_comments": "posts/comments/list",
    "lztapi_create_post_comment": "posts/comments/create",
    "lztapi_edit_post_comment": "posts/comments/edit",
    "lztapi_delete_post_comment": "posts/comments/delete",
    "lztapi_report_post_comment": "posts/comments/report",
    "lztapi_get_post_report_reasons": "posts/report-reasons",
    "lztapi_get_post_comment_report_reasons": "posts/comments/report-reasons",
    "lztapi_get_profile_posts": "profile-posts/list",
    "lztapi_get_profile_post": "profile-posts/get",
    "lztapi_create_profile_post": "profile-posts/create",
    "lztapi_edit_profile_post": "profile-posts/edit",
    "lztapi_delete_profile_post": "profile-posts/delete",
    "lztapi_like_profile_post": "profile-posts/like",
    "lztapi_unlike_profile_post": "profile-posts/unlike",
    "lztapi_report_profile_post": "profile-posts/report",
    "lztapi_get_profile_post_likes": "profile-posts/likes",
    "lztapi_stick_profile_post": "profile-posts/stick",
    "lztapi_unstick_profile_post": "profile-posts/unstick",
    "lztapi_get_profile_post_comments": "profile-posts/comments/list",
    "lztapi_get_profile_post_comment": "profile-posts/comments/get",
    "lztapi_create_profile_post_comment": "profile-posts/comments/create",
    "lztapi_edit_profile_post_comment": "profile-posts/comments/edit",
    "lztapi_delete_profile_post_comment": "profile-posts/comments/delete",
    "lztapi_report_profile_post_comment": "profile-posts/comments/report",
    "lztapi_get_profile_post_report_reasons": "profile-posts/report-reasons",
    "lztapi_get_profile_post_comment_report_reasons": "profile-posts/comments/report-reasons",
    "lztapi_get_users": "users/list",
    "lztapi_get_user": "users/get",
    "lztapi_get_current_user": "users/current",
    "lztapi_edit_user": "users/edit",
    "lztapi_find_users": "users/find",
    "lztapi_follow_user": "users/follow",
    "lztapi_unfollow_user": "users/unfollow",
    "lztapi_get_user_followers": "users/followers",
    "lztapi_get_followed_users_by_user": "users/followings",
    "lztapi_get_user_fields": "users/fields",
    "lztapi_ignore_user": "users/ignore",
    "lztapi_unignore_user": "users/unignore",
    "lztapi_get_ignored_users": "users/ignored",
    "lztapi_edit_ignore_user": "users/ignore-edit",
    "lztapi_get_user_claims": "users/claims",
    "lztapi_get_user_likes": "users/likes",
    "lztapi_get_user_trophies": "users/trophies",
    "lztapi_get_secret_answer_types": "users/sa/types",
    "lztapi_reset_secret_answer": "users/sa/reset",
    "lztapi_cancel_sa_reset": "users/sa/cancel-reset",
    "lztapi_upload_avatar": "users/avatar/upload",
    "lztapi_crop_avatar": "users/avatar/crop",
    "lztapi_delete_avatar": "users/avatar/delete",
    "lztapi_upload_background": "users/background/upload",
    "lztapi_crop_background": "users/background/crop",
    "lztapi_delete_background": "users/background/delete",
    "lztapi_get_contents": "users/timeline",
    "lztapi_get_conversations": "conversations/list",
    "lztapi_get_conversation": "conversations/get",
    "lztapi_create_conversation": "conversations/create",
    "lztapi_leave_conversation": "conversations/leave",
    "lztapi_get_conversation_messages": "conversations/messages/list",
    "lztapi_get_conversation_message": "conversations/messages/get",
    "lztapi_create_conversation_message": "conversations/messages/create",
    "lztapi_edit_conversation_message": "conversations/messages/edit",
    "lztapi_get_notifications": "notifications/list",
    "lztapi_get_notification": "notifications/get",
    "lztapi_mark_notification_read": "notifications/read",
    "lztapi_get_tags": "tags/list",
    "lztapi_get_popular_tags": "tags/popular",
    "lztapi_get_tagged_content": "tags/tagged",
    "lztapi_get_filtered_content": "tags/find",
    "lztapi_get_navigation": "navigation/get",
    "lztapi_get_navigation_elements": "navigation/elements",
    "lztapi_search": "search/all",
    "lztapi_search_thread": "search/threads",
    "lztapi_search_post": "search/posts",
    "lztapi_search_profile_posts": "search/profile-posts",
    "lztapi_search_tagged": "search/tagged",
    "lztapi_get_chats": "chatbox/list",
    "lztapi_get_ignored_users_chats": "chatbox/ignored",
    "lztapi_ignore_chat_user": "chatbox/ignore",
    "lztapi_unignore_chat_user": "chatbox/unignore",
    "lztapi_get_chat_messages": "chatbox/messages/list",
    "lztapi_create_chat_message": "chatbox/messages/create",
    "lztapi_edit_chat_message": "chatbox/messages/edit",
    "lztapi_delete_chat_message": "chatbox/messages/delete",
    "lztapi_report_chat_message": "chatbox/messages/report",
    "lztapi_get_chat_report_reasons": "chatbox/messages/report-reasons",
    "lztapi_get_chat_online": "chatbox/online",
    "lztapi_get_chat_leaderboard": "chatbox/leaderboard",
    "lztapi_batch_record": "batch/record",
    "lztapi_batch_stop": "batch/stop",
    "lztapi_batch_execute": "batch/execute",

    # --- Новые из обновлённой схемы ---
    "lztapi_get_forum_followers": "forums/followers",
    "lztapi_get_thread_navigation": "threads/navigation",
    "lztapi_edit_conversation": "conversations/edit",
    "lztapi_delete_conversation": "conversations/delete",
    "lztapi_start_conversation": "conversations/start",
    "lztapi_save_conversation": "conversations/save",
    "lztapi_search_conversation": "conversations/search",
    "lztapi_invite_conversation": "conversations/invite",
    "lztapi_kick_conversation": "conversations/kick",
    "lztapi_read_conversation": "conversations/read",
    "lztapi_readall_conversations": "conversations/read-all",
    "lztapi_star_conversation": "conversations/star",
    "lztapi_unstar_conversation": "conversations/unstar",
    "lztapi_enable_conversation_alerts": "conversations/alerts/enable",
    "lztapi_disable_conversation_alerts": "conversations/alerts/disable",
    "lztapi_delete_conversation_message": "conversations/messages/delete",
    "lztapi_stick_conversation_message": "conversations/messages/stick",
    "lztapi_unstick_conversation_message": "conversations/messages/unstick",
    "lztapi_search_users": "search/users",
    "lztapi_get_search_results": "search/results",
    "lztapi_get_forms": "forms/list",
    "lztapi_create_form": "forms/create",
}


def action_to_folder(action_name):
    """Определяет папку для action. Сначала ищет в FOLDER_MAP, потом вычисляет."""
    if action_name in FOLDER_MAP:
        return FOLDER_MAP[action_name]

    # Автоматическое определение из имени: lztapi_verb_entity → entity/verb
    name = action_name.replace('lztapi_', '')
    # Типичные паттерны
    verbs = ['get', 'create', 'edit', 'delete', 'follow', 'unfollow',
             'like', 'unlike', 'report', 'ignore', 'unignore',
             'find', 'search', 'list', 'bump', 'move', 'hide',
             'stick', 'unstick', 'star', 'unstar', 'leave', 'mark', 'upload',
             'crop', 'vote', 'reset', 'cancel']
    for verb in verbs:
        if name.startswith(verb + '_'):
            rest = name[len(verb) + 1:]
            return f"{rest.replace('_', '-')}/{verb}"
    return name.replace('_', '-')

# =============================================================================
# КОНФИГ: operationId → BAS маппинг
# Формат: operationId → (bas_name, engine_path, tooltip_en, tooltip_ru)
# None = пропустить эндпоинт
# =============================================================================
CUSTOM_OP_MAP = {
    "OAuth.Token": None,
    "Assets.Css": None,

    # Threads special
    "Threads.CreateContest": ("lztapi_create_contest", "__Threads.__Contests.create",
                              "Create a new contest.", "Создать розыгрыш"),
    "Threads.Claim": ("lztapi_create_arbitrage", "__Threads.__Arbitrage.create",
                       "Create a Arbitrage.", "Создать арбитраж"),
    "Threads.Bump": ("lztapi_bump_thread", "__Threads.bump",
                      "Bump a thread.", "Поднять тему"),
    "Threads.Move": ("lztapi_move_thread", "__Threads.move",
                      "Move a thread to another forum.", "Переместить тему"),
    "Threads.Hide": ("lztapi_hide_thread", "__Threads.hide",
                      "Hide a thread from feed.", "Скрыть тему из ленты"),
    "Threads.Star": ("lztapi_bookmark_thread", "__Threads.star",
                      "Bookmark a thread.", "Добавить тему в закладки"),
    "Threads.Unstar": ("lztapi_unbookmark_thread", "__Threads.unstar",
                        "Unbookmark a thread.", "Убрать тему из закладок"),
    "Threads.Finish": ("lztapi_finish_contest", "__Threads.finishContest",
                        "Finish a contest.", "Завершить розыгрыш"),
    "Threads.Poll.Get": ("lztapi_get_poll", "__Threads.votes",
                          "Detail information of a poll.", "Информация о голосовании"),
    "Threads.Poll.Vote": ("lztapi_vote_poll", "__Threads.vote",
                           "Vote on a thread poll.", "Проголосовать"),
    "Threads.Unread": ("lztapi_get_unread_threads", "__Threads.new_",
                        "List of unread threads.", "Непрочитанные темы"),
    "Threads.Recent": ("lztapi_get_recent_threads", "__Threads.recent",
                        "List of recent threads.", "Последние темы"),

    # Posts comments
    "Posts.Comments.Get": ("lztapi_get_post_comments", "__Posts.__Posts_comments.get",
                           "List post comments.", "Список комментариев"),
    "Posts.Comments.Create": ("lztapi_create_post_comment", "__Posts.__Posts_comments.create",
                              "Create a post comment.", "Создать комментарий"),
    "Posts.Comments.Edit": ("lztapi_edit_post_comment", "__Posts.__Posts_comments.edit",
                            "Edit a post comment.", "Редактировать комментарий"),
    "Posts.Comments.Delete": ("lztapi_delete_post_comment", "__Posts.__Posts_comments.delete_",
                              "Delete a post comment.", "Удалить комментарий"),
    "Posts.Comments.Report": ("lztapi_report_post_comment", "__Posts.__Posts_comments.report",
                              "Report a post comment.", "Пожаловаться на комментарий"),
    "Posts.Comments.ReportReasons": ("lztapi_get_post_comment_report_reasons",
                                     "__Posts.__Posts_comments.reportReasons",
                                     "Get post comment report reasons.", "Причины жалобы на комментарий"),
    "Posts.ReportReasons": ("lztapi_get_post_report_reasons", "__Posts.reportReasons",
                            "Get post report reasons.", "Причины жалобы на пост"),

    # Profile posts
    "ProfilePosts.Stick": ("lztapi_stick_profile_post", "__Profile_posts.stick",
                           "Stick a profile post.", "Закрепить сообщение профиля"),
    "ProfilePosts.Unstick": ("lztapi_unstick_profile_post", "__Profile_posts.unstick",
                             "Unstick a profile post.", "Открепить сообщение профиля"),
    "ProfilePosts.ReportReasons": ("lztapi_get_profile_post_report_reasons",
                                   "__Profile_posts.reportReasons",
                                   "Get profile post report reasons.", "Причины жалобы на запись профиля"),

    # Profile post comments
    "ProfilePosts.Comments.List": ("lztapi_get_profile_post_comments",
                                   "__Profile_posts.__Profile_posts_comments.list",
                                   "List profile post comments.", "Комментарии профиля"),
    "ProfilePosts.Comments.Get": ("lztapi_get_profile_post_comment",
                                  "__Profile_posts.__Profile_posts_comments.get",
                                  "Profile post comment details.", "Подробности комментария"),
    "ProfilePosts.Comments.Create": ("lztapi_create_profile_post_comment",
                                     "__Profile_posts.__Profile_posts_comments.create",
                                     "Create profile post comment.", "Создать комментарий"),
    "ProfilePosts.Comments.Edit": ("lztapi_edit_profile_post_comment",
                                   "__Profile_posts.__Profile_posts_comments.edit",
                                   "Edit profile post comment.", "Редактировать комментарий профиля"),
    "ProfilePosts.Comments.Delete": ("lztapi_delete_profile_post_comment",
                                     "__Profile_posts.__Profile_posts_comments.delete_",
                                     "Delete profile post comment.", "Удалить комментарий профиля"),
    "ProfilePosts.Comments.Report": ("lztapi_report_profile_post_comment",
                                     "__Profile_posts.__Profile_posts_comments.report",
                                     "Report profile post comment.", "Пожаловаться на комментарий профиля"),
    "ProfilePosts.Comments.ReportReasons": ("lztapi_get_profile_post_comment_report_reasons",
                                            "__Profile_posts.__Profile_posts_comments.reportReasons",
                                            "Get profile post comment report reasons.",
                                            "Причины жалобы на комментарий профиля"),

    # Users special
    "Users.Current": ("lztapi_get_current_user", "__Users.getCurrent",
                      "Current user details.", "Текущий пользователь"),
    "Users.Claims": ("lztapi_get_user_claims", "__Users.claims",
                     "Get user claims.", "Арбитражи пользователя"),
    "Users.Likes": ("lztapi_get_user_likes", "__Users.likes",
                    "Get user likes.", "Лайки пользователя"),
    "Users.Trophies": ("lztapi_get_user_trophies", "__Users.trophies",
                       "Get user trophies.", "Трофеи пользователя"),
    "Users.SecretAnswerTypes": ("lztapi_get_secret_answer_types", "__Users.secretAnswerTypes",
                                "Get secret answer types.", "Типы секретных вопросов"),
    "Users.SA.Reset": ("lztapi_reset_secret_answer", "__Users.resetSecretAnswer",
                       "Reset secret answer.", "Сбросить секретный ответ"),
    "Users.SA.CancelReset": ("lztapi_cancel_sa_reset", "__Users.cancelSAReset",
                             "Cancel SA reset.", "Отменить сброс"),
    "Users.IgnoreEdit": ("lztapi_edit_ignore_user", "__Users.ignoreEdit",
                         "Edit ignoring options.", "Настройки игнора"),

    # Forums special
    "Forums.Grouped": ("lztapi_get_forums_grouped", "__Forums.grouped",
                       "Returns grouped forums.", "Группированные разделы"),
    "Forums.GetFeedOptions": ("lztapi_get_feed_options", "__Forums.getFeedOptions",
                              "Get feed options.", "Настройки ленты"),
    "Forums.EditFeedOptions": ("lztapi_edit_feed_options", "__Forums.editFeedOptions",
                               "Edit feed options.", "Изменить настройки ленты"),

    # Link forums
    "Links.List": ("lztapi_get_link_forums", "__LinkForums.list",
                   "List link forums.", "Список ссылок"),
    "Links.Get": ("lztapi_get_link_forum", "__LinkForums.get",
                  "Link forum details.", "Подробности ссылки"),

    # Chatbox
    "Chatbox.List": ("lztapi_get_chats", "__Chatbox.list",
                     "List chatbox rooms.", "Список комнат чата"),
    "Chatbox.Ignored": ("lztapi_get_ignored_users_chats", "__Chatbox.ignored",
                        "List ignored chat users.", "Игнор-лист чата"),
    "Chatbox.Ignore": ("lztapi_ignore_chat_user", "__Chatbox.ignore",
                       "Ignore chat user.", "Игнорировать в чате"),
    "Chatbox.Unignore": ("lztapi_unignore_chat_user", "__Chatbox.unignore",
                         "Unignore chat user.", "Убрать из игнора чата"),
    "Chatbox.Messages.List": ("lztapi_get_chat_messages", "__Chatbox.__Chatbox_messages.get",
                              "List chat messages.", "Сообщения чата"),
    "Chatbox.Messages.Create": ("lztapi_create_chat_message", "__Chatbox.__Chatbox_messages.create",
                                "Create chat message.", "Написать в чат"),
    "Chatbox.Messages.Edit": ("lztapi_edit_chat_message", "__Chatbox.__Chatbox_messages.edit",
                              "Edit chat message.", "Редактировать сообщение чата"),
    "Chatbox.Messages.Delete": ("lztapi_delete_chat_message", "__Chatbox.__Chatbox_messages.delete_",
                                "Delete chat message.", "Удалить сообщение чата"),
    "Chatbox.Messages.Report": ("lztapi_report_chat_message", "__Chatbox.__Chatbox_messages.report",
                                "Report chat message.", "Пожаловаться на сообщение чата"),

    # Conversations
    "Conversations.Messages.List": ("lztapi_get_conversation_messages",
                                    "__Conversations.__Conversations_messages.list",
                                    "List conversation messages.", "Сообщения диалога"),
    "Conversations.Messages.Get": ("lztapi_get_conversation_message",
                                   "__Conversations.__Conversations_messages.get",
                                   "Message details.", "Подробности сообщения"),
    "Conversations.Messages.Create": ("lztapi_create_conversation_message",
                                      "__Conversations.__Conversations_messages.create",
                                      "Create conversation message.", "Создать сообщение"),
    "Conversations.Messages.Edit": ("lztapi_edit_conversation_message",
                                    "__Conversations.__Conversations_messages.edit",
                                    "Edit conversation message.", "Редактировать сообщение"),

    # Search
    "Search.All": ("lztapi_search", "__Search.all", "Search all.", "Поиск всего"),
    "Search.Threads": ("lztapi_search_thread", "__Search.thread",
                       "Search for threads.", "Поиск тем"),
    "Search.Posts": ("lztapi_search_post", "__Search.post",
                     "Search for posts.", "Поиск сообщений"),
    "Search.ProfilePosts": ("lztapi_search_profile_posts", "__Search.profile_posts",
                            "Search profile posts.", "Поиск сообщений профиля"),
    "Search.Tagged": ("lztapi_search_tagged", "__Search.tag",
                      "Search by tags.", "Поиск по тегам"),

    # Notifications
    "Notifications.List": ("lztapi_get_notifications", "__Notifications.list",
                           "List notifications.", "Список уведомлений"),
    "Notifications.Get": ("lztapi_get_notification", "__Notifications.get",
                          "Notification details.", "Подробности уведомления"),
    "Notifications.Read": ("lztapi_mark_notification_read", "__Notifications.read",
                           "Mark notification(s) read.", "Отметить прочитанным"),

    # Tags
    "Tags.Popular": ("lztapi_get_popular_tags", "__Tags.popular",
                     "List popular tags.", "Популярные теги"),
    "Tags.List": ("lztapi_get_tags", "__Tags.list", "List tags.", "Список тегов"),
    "Tags.Get": ("lztapi_get_tagged_content", "__Tags.tagged",
                 "List tagged contents.", "Содержимое по тегу"),
    "Tags.Find": ("lztapi_get_filtered_content", "__Tags.find",
                  "Filtered tags.", "Поиск тегов"),

    # --- Новые operationId из обновлённой схемы ---

    # Navigation (новый operationId)
    "Navigation.List": ("lztapi_get_navigation", "navigation.list",
                        "List navigation elements.", "Элементы навигации"),

    # Posts — likes / comments (новые operationId)
    "Posts.Likes": ("lztapi_get_post_likes", "__Posts.likes",
                    "List of users who liked a post.", "Лайки поста"),
    "Posts.Comments.Edit": ("lztapi_edit_post_comment", "__Posts.__Posts_comments.edit",
                            "Edit a post comment.", "Редактировать комментарий"),
    "Posts.Comments.Delete": ("lztapi_delete_post_comment", "__Posts.__Posts_comments.delete_",
                              "Delete a post comment.", "Удалить комментарий"),
    "Posts.Comments.Report": ("lztapi_report_post_comment", "__Posts.__Posts_comments.report",
                              "Report a post comment.", "Пожаловаться на комментарий"),

    # Profile posts — likes / stick (новые)
    "ProfilePosts.Likes": ("lztapi_get_profile_post_likes", "__Profile_posts.likes",
                           "List of users who liked a profile post.", "Лайки записи профиля"),
    "ProfilePosts.Stick": ("lztapi_stick_profile_post", "__Profile_posts.stick",
                           "Stick a profile post.", "Закрепить запись профиля"),
    "ProfilePosts.Unstick": ("lztapi_unstick_profile_post", "__Profile_posts.unstick",
                             "Unstick a profile post.", "Открепить запись профиля"),

    # Users — avatar/background (схема поменяла operationId)
    "Users.Avatar.Upload": ("lztapi_upload_avatar", "__Users.__Avatar.upload",
                            "Upload user avatar.", "Загрузить аватар"),
    "Users.Avatar.Delete": ("lztapi_delete_avatar", "__Users.__Avatar.delete_",
                            "Delete user avatar.", "Удалить аватар"),
    "Users.Avatar.Crop": ("lztapi_crop_avatar", "__Users.__Avatar.crop",
                          "Crop user avatar.", "Обрезать аватар"),
    "Users.Background.Upload": ("lztapi_upload_background", "__Users.__Background.upload",
                                "Upload user background.", "Загрузить фон"),
    "Users.Background.Delete": ("lztapi_delete_background", "__Users.__Background.delete_",
                                "Delete user background.", "Удалить фон"),
    "Users.Background.Crop": ("lztapi_crop_background", "__Users.__Background.crop",
                              "Crop user background.", "Обрезать фон"),

    # Threads — navigation
    "Threads.Navigation": ("lztapi_get_thread_navigation", "__Threads.navigation",
                           "Get thread navigation.", "Навигация темы"),

    # Conversations — новые действия
    "Conversations.Update": ("lztapi_edit_conversation", "__Conversations.edit",
                             "Edit conversation settings.", "Изменить настройки диалога"),
    "Conversations.Delete": ("lztapi_delete_conversation", "__Conversations.delete_",
                             "Delete a conversation.", "Удалить диалог"),
    "Conversations.Start": ("lztapi_start_conversation", "__Conversations.start",
                            "Start a conversation with user.", "Начать диалог"),
    "Conversations.Save": ("lztapi_save_conversation", "__Conversations.save",
                           "Save a conversation by link.", "Сохранить диалог по ссылке"),
    "Conversations.Search": ("lztapi_search_conversation", "__Conversations.search",
                             "Search in conversations.", "Поиск в диалогах"),
    "Conversations.Invite": ("lztapi_invite_conversation", "__Conversations.invite",
                             "Invite users to conversation.", "Пригласить в диалог"),
    "Conversations.Kick": ("lztapi_kick_conversation", "__Conversations.kick",
                           "Kick user from conversation.", "Исключить из диалога"),
    "Conversations.Read": ("lztapi_read_conversation", "__Conversations.read",
                           "Mark conversation as read.", "Отметить прочитанным"),
    "Conversations.ReadAll": ("lztapi_readall_conversations", "__Conversations.readAll",
                              "Mark all conversations read.", "Прочитать все диалоги"),
    "Conversations.Star": ("lztapi_star_conversation", "__Conversations.star",
                           "Star a conversation.", "Добавить в избранное"),
    "Conversations.Unstar": ("lztapi_unstar_conversation", "__Conversations.unstar",
                             "Unstar a conversation.", "Убрать из избранного"),
    "Conversations.Alerts.Enable": ("lztapi_enable_conversation_alerts", "__Conversations.alerts.enable",
                                    "Enable conversation alerts.", "Включить уведомления"),
    "Conversations.Alerts.Disable": ("lztapi_disable_conversation_alerts", "__Conversations.alerts.disable",
                                     "Disable conversation alerts.", "Выключить уведомления"),
    "Conversations.Messages.Delete": ("lztapi_delete_conversation_message", "__Conversations.__Conversations_messages.delete_",
                                      "Delete conversation message.", "Удалить сообщение"),
    "Conversations.Messages.Stick": ("lztapi_stick_conversation_message", "__Conversations.__Conversations_messages.stick",
                                     "Stick conversation message.", "Закрепить сообщение"),
    "Conversations.Messages.Unstick": ("lztapi_unstick_conversation_message", "__Conversations.__Conversations_messages.unstick",
                                       "Unstick conversation message.", "Открепить сообщение"),

    # Search — новые
    "Search.Users": ("lztapi_search_users", "__Search.users",
                     "Search for users.", "Поиск пользователей"),
    "Search.Results": ("lztapi_get_search_results", "__Search.results",
                       "Get search results.", "Результаты поиска"),

    # Chatbox — operationId полностью поменялись
    "Chatbox.Index": ("lztapi_get_chats", "__Chatbox.list",
                      "List chatbox rooms.", "Список комнат чата"),
    "Chatbox.GetMessages": ("lztapi_get_chat_messages", "__Chatbox.__Chatbox_messages.get",
                            "List chat messages.", "Сообщения чата"),
    "Chatbox.PostMessage": ("lztapi_create_chat_message", "__Chatbox.__Chatbox_messages.create",
                            "Create chat message.", "Написать в чат"),
    "Chatbox.EditMessage": ("lztapi_edit_chat_message", "__Chatbox.__Chatbox_messages.edit",
                            "Edit chat message.", "Редактировать сообщение чата"),
    "Chatbox.DeleteMessage": ("lztapi_delete_chat_message", "__Chatbox.__Chatbox_messages.delete_",
                              "Delete chat message.", "Удалить сообщение чата"),
    "Chatbox.Online": ("lztapi_get_chat_online", "__Chatbox.online",
                       "Get online users in chat.", "Онлайн пользователи чата"),
    "Chatbox.ReportReasons": ("lztapi_get_chat_report_reasons", "__Chatbox.reportReasons",
                              "Get chat report reasons.", "Причины жалобы в чате"),
    "Chatbox.Report": ("lztapi_report_chat_message", "__Chatbox.__Chatbox_messages.report",
                       "Report chat message.", "Пожаловаться на сообщение чата"),
    "Chatbox.GetLeaderboard": ("lztapi_get_chat_leaderboard", "__Chatbox.leaderboard",
                               "Get chat leaderboard.", "Лидерборд чата"),
    "Chatbox.GetIgnore": ("lztapi_get_ignored_users_chats", "__Chatbox.ignored",
                          "List ignored chat users.", "Игнор-лист чата"),
    "Chatbox.PostIgnore": ("lztapi_ignore_chat_user", "__Chatbox.ignore",
                           "Ignore chat user.", "Игнорировать в чате"),
    "Chatbox.DeleteIgnore": ("lztapi_unignore_chat_user", "__Chatbox.unignore",
                             "Unignore chat user.", "Убрать из игнора чата"),

    # Batch
    "Batch.Execute": ("lztapi_batch_execute", "__Batch.execute",
                      "Execute batch request.", "Выполнить пакетный запрос"),

    # Forms
    "Forms.List": ("lztapi_get_forms", "__Forms.list",
                   "List forms.", "Список форм"),
    "Forms.Create": ("lztapi_create_form", "__Forms.create",
                     "Create a form.", "Создать форму"),

    # Forums — followers
    "Forums.Followers": ("lztapi_get_forum_followers", "__Forums.followers",
                         "List forum followers.", "Подписчики раздела"),
}


# =============================================================================
# Утилиты
# =============================================================================

def snake_to_camel(name):
    """forum_id -> forumId"""
    parts = name.split('_')
    return parts[0] + ''.join(p.capitalize() for p in parts[1:])


def get_scopes_from_security(security):
    scopes = []
    if security:
        for sec in security:
            for key, vals in sec.items():
                scopes.extend(vals)
    return scopes or ['read']


def get_param_type(param):
    schema = param.get('schema', {})
    t = schema.get('type', 'string')
    if t == 'integer':
        return 'int'
    elif t == 'boolean':
        return 'boolean'
    elif t == 'array':
        return 'array'
    return 'string'


def _extract_props_from_schema(schema):
    """Извлекает properties из schema, включая oneOf/anyOf варианты."""
    all_props = {}
    all_required = set()

    # Прямые properties
    if 'properties' in schema:
        all_required = set(schema.get('required', []))
        for name, prop in schema['properties'].items():
            all_props[name] = prop

    # oneOf / anyOf — собираем все уникальные свойства из всех вариантов
    for key in ('oneOf', 'anyOf'):
        for variant in schema.get(key, []):
            variant_required = set(variant.get('required', []))
            for name, prop in variant.get('properties', {}).items():
                if name not in all_props:
                    all_props[name] = prop
                # Поле required только если required во ВСЕХ вариантах
                # (для oneOf это спорно, так что лучше не ставить)
            # Вложенные properties в fields объектах внутри вариантов
            for name, prop in variant.get('properties', {}).items():
                if prop.get('type') == 'object' and 'properties' in prop:
                    for sub_name, sub_prop in prop['properties'].items():
                        full_name = f"{name}.{sub_name}"
                        if full_name not in all_props:
                            all_props[full_name] = {
                                **sub_prop,
                                '_parent_field': name,
                                '_variant': variant.get('title', ''),
                            }

    return all_props, all_required


def get_body_params(operation):
    params = []
    rb = operation.get('requestBody', {})
    content = rb.get('content', {})
    for ct, spec in content.items():
        schema = spec.get('schema', {})
        all_props, all_required = _extract_props_from_schema(schema)

        for name, prop in all_props.items():
            # Пропускаем вложенные fields.X — они обрабатываются отдельно
            if '.' in name:
                continue

            # Рекурсия для вложенных объектов типа fields
            if prop.get('type') == 'object' and 'properties' in prop and name == 'fields':
                for sub_name, sub_prop in prop['properties'].items():
                    params.append({
                        'name': sub_name,
                        'in': 'body',
                        'required': False,
                        'description': sub_prop.get('description', ''),
                        'schema': sub_prop,
                        '_parent_field': name,
                    })
            else:
                params.append({
                    'name': name,
                    'in': 'body',
                    'required': name in all_required,
                    'description': prop.get('description', ''),
                    'schema': prop,
                })

        # Обработка вложенных fields.X из oneOf вариантов
        variant_fields = {}
        for full_name, prop in all_props.items():
            if '.' in full_name and prop.get('_parent_field') == 'fields':
                sub_name = full_name.split('.', 1)[1]
                if sub_name not in variant_fields:
                    variant_fields[sub_name] = prop

        for sub_name, prop in variant_fields.items():
            # Проверяем что fields.X ещё не добавлен через прямой парсинг
            if not any(p['name'] == sub_name for p in params):
                clean_prop = {k: v for k, v in prop.items()
                              if not k.startswith('_')}
                params.append({
                    'name': sub_name,
                    'in': 'body',
                    'required': False,
                    'description': prop.get('description', ''),
                    'schema': clean_prop,
                    '_parent_field': 'fields',
                    '_variant': prop.get('_variant', ''),
                })

    return params


def resolve_ref_param(ref_str):
    """Простой резолв $ref для параметров."""
    name = ref_str.split('/')[-1]
    mapping = {
        'thread_id': {'name': 'thread_id', 'in': 'path', 'required': True,
                      'description': 'Id of thread.', 'schema': {'type': 'integer'}},
        'user_id_path': {'name': 'user_id', 'in': 'path', 'required': True,
                         'description': 'User id.', 'schema': {'type': 'integer'}},
        'profile_post_id': {'name': 'profile_post_id', 'in': 'path', 'required': True,
                            'description': 'Id of profile post.', 'schema': {'type': 'integer'}},
        'post_id': {'name': 'post_id', 'in': 'path', 'required': True,
                    'description': 'Id of post.', 'schema': {'type': 'integer'}},
        'forum_id': {'name': 'forum_id', 'in': 'path', 'required': True,
                     'description': 'Id of forum.', 'schema': {'type': 'integer'}},
        'category_id': {'name': 'category_id', 'in': 'path', 'required': True,
                        'description': 'Id of category.', 'schema': {'type': 'integer'}},
        'page_id': {'name': 'page_id', 'in': 'path', 'required': True,
                    'description': 'Id of page.', 'schema': {'type': 'integer'}},
        'notification_id': {'name': 'notification_id', 'in': 'path', 'required': True,
                            'description': 'Id of notification.', 'schema': {'type': 'integer'}},
        'conversation_id': {'name': 'conversation_id', 'in': 'path', 'required': True,
                            'description': 'Id of conversation.', 'schema': {'type': 'integer'}},
        'message_id': {'name': 'message_id', 'in': 'path', 'required': True,
                       'description': 'Id of message.', 'schema': {'type': 'integer'}},
        'comment_id': {'name': 'comment_id', 'in': 'path', 'required': True,
                       'description': 'Id of comment.', 'schema': {'type': 'integer'}},
    }
    return mapping.get(name)


def operation_id_to_action_name(op_id, method):
    if op_id in CUSTOM_OP_MAP:
        mapping = CUSTOM_OP_MAP[op_id]
        return mapping[0] if mapping else None

    parts = op_id.split('.')
    tag = parts[0].lower()
    action_part = parts[-1].lower() if len(parts) > 1 else 'list'

    singular = {
        'categories': 'category', 'forums': 'forum', 'threads': 'thread',
        'posts': 'post', 'pages': 'page', 'users': 'user',
        'profileposts': 'profile_post', 'notifications': 'notification',
        'conversations': 'conversation', 'tags': 'tag',
        'navigation': 'navigation', 'chatbox': 'chat', 'search': 'search',
    }.get(tag, tag)

    plural = {
        'category': 'categories', 'forum': 'forums', 'thread': 'threads',
        'post': 'posts', 'page': 'pages', 'user': 'users',
        'profile_post': 'profile_posts', 'notification': 'notifications',
        'conversation': 'conversations', 'tag': 'tags', 'chat': 'chats',
    }.get(singular, singular + 's')

    action_map = {
        'list': f"lztapi_get_{plural}",
        'get': f"lztapi_get_{singular}",
        'create': f"lztapi_create_{singular}",
        'edit': f"lztapi_edit_{singular}",
        'delete': f"lztapi_delete_{singular}",
        'follow': f"lztapi_follow_{singular}",
        'unfollow': f"lztapi_unfollow_{singular}",
        'followers': f"lztapi_get_{singular}_followers",
        'followed': f"lztapi_get_followed_{plural}",
        'like': f"lztapi_like_{singular}",
        'unlike': f"lztapi_unlike_{singular}",
        'report': f"lztapi_report_{singular}",
        'ignore': f"lztapi_ignore_{singular}",
        'unignore': f"lztapi_unignore_{singular}",
        'find': f"lztapi_find_{plural}",
        'fields': f"lztapi_get_{singular}_fields",
        'followings': f"lztapi_get_followed_users_by_user",
        'ignored': f"lztapi_get_ignored_{plural}",
        'contents': f"lztapi_get_contents",
    }
    return action_map.get(action_part, f"lztapi_{action_part}_{singular}")


def get_engine_path(op_id):
    if op_id in CUSTOM_OP_MAP:
        mapping = CUSTOM_OP_MAP[op_id]
        return mapping[1] if mapping else None

    parts = op_id.split('.')
    tag_map = {
        'Categories': '__Categories', 'Forums': '__Forums', 'Threads': '__Threads',
        'Posts': '__Posts', 'Pages': '__Pages', 'Users': '__Users',
        'ProfilePosts': '__Profile_posts', 'Notifications': '__Notifications',
        'Conversations': '__Conversations', 'Tags': '__Tags', 'Search': '__Search',
        'Navigation': 'navigation', 'Chatbox': '__Chatbox',
    }
    method_map = {
        'List': 'list', 'Get': 'get', 'Create': 'create', 'Edit': 'edit',
        'Delete': 'delete_', 'Follow': 'follow', 'Unfollow': 'unfollow',
        'Followers': 'followers', 'Followed': 'followed', 'Like': 'like',
        'Unlike': 'unlike', 'Report': 'report', 'Ignore': 'ignore',
        'Unignore': 'unignore', 'Find': 'search', 'Fields': 'fields',
        'Followings': 'followings', 'Ignored': 'ignored', 'Contents': 'timeline',
    }
    sub_tag_map = {
        'Avatar': '__Avatar', 'Background': '__Background', 'Poll': '__Poll',
        'Comments': '__Posts_comments', 'Messages': '__Conversations_messages',
    }

    tag_name = tag_map.get(parts[0], f'__{parts[0]}')
    if len(parts) == 1:
        return tag_name
    method_name = method_map.get(parts[-1], parts[-1].lower())
    if len(parts) == 2:
        return f"{tag_name}.{method_name}"
    elif len(parts) >= 3:
        sub = sub_tag_map.get(parts[1], f'__{parts[1]}')
        return f"{tag_name}.{sub}.{method_name}"
    return f"{tag_name}.{method_name}"


def get_tooltip(op_id, summary):
    if op_id in CUSTOM_OP_MAP and CUSTOM_OP_MAP[op_id]:
        return CUSTOM_OP_MAP[op_id][2], CUSTOM_OP_MAP[op_id][3]
    return summary, f"[TODO] {summary}"


# =============================================================================
# Генерация _code.js
# =============================================================================

def gen_code_js(action_name, engine_path, all_params):
    lines = [f"_call_function(_LZTAPI.{engine_path}, {{"]
    plines = []
    for p in all_params:
        name = snake_to_camel(p['name']) if p.get('in') == 'path' else p['name']
        plines.append(f"  {name}:  (<%= {name} %>)")
    plines.append("  timeout:  (<%= timeout %>) * 1000")
    plines.append("  interval: (<%= interval %>) * 1000")
    plines.append("  maxTime: (<%= maxTime %>) * 1000")
    lines.append(",\n".join(plines))
    lines.append("})!")
    lines.append("<%= variable %> = _result_function()")
    return "\n".join(lines)


# =============================================================================
# Генерация _interface.js — с учётом всех паттернов BAS
# =============================================================================

def _render_param_widget(p):
    """Рендерит один виджет параметра для interface.js"""
    name = snake_to_camel(p['name']) if p.get('in') == 'path' else p['name']
    desc = p.get('description', name)
    ptype = get_param_type(p)
    schema = p.get('schema', {})
    enum_vals = schema.get('enum', [])
    # Fallback: если нет enum, берём examples как варианты
    if not enum_vals:
        examples = schema.get('examples', [])
        if examples and all(isinstance(e, (str, int)) for e in examples):
            enum_vals = examples

    # === Checkbox для boolean ===
    if ptype == 'boolean':
        checked = "true" if schema.get('default') else "false"
        extras = ""
        if name in CHECKBOX_VISIBLE_IF:
            for k, v in CHECKBOX_VISIBLE_IF[name].items():
                extras += f',\n\t\t{k}: "{v}"'
        return f"""\t<%= _.template($('#checkbox').html())({{
\t\tid: "{name}",
\t\ttitle: tr("{desc}"){extras},
\t\tchecked: {checked}
\t}}) %>"""

    # === Textarea для body-контентов ===
    if name in TEXTAREA_PARAMS:
        return f"""\t<%= _.template($('#input_constructor').html())({{
\t\tid: "{name}",
\t\tdescription: tr("{name}"),
\t\tdefault_selector: "string",
\t\tdisable_int: true,
\t\tdisable_editor: true,
\t\tdisable_expression: true,
\t\tuse_textarea: true,
\t\treplace_linebreaks: true,
\t\tsize: 8,
\t\tdisable_type_chooser: true,
\t\ttextarea_height: 80,
\t\thelp: {{
\t\t\tdescription: tr("{desc}")
\t\t}}
\t}}) %>"""

    # === reply_group — специальные variants ===
    if name == 'reply_group':
        variants_lines = ',\n'.join(
            f'\t\t\t"{v}"' for v in REPLY_GROUP_VARIANTS
        )
        return f"""\t<%= _.template($('#input_constructor').html())({{
\t\tid: "reply_group",
\t\tdescription: tr("reply_group"),
\t\tdefault_selector: "string",
\t\tdisable_int: true,
\t\tvalue_string: "",
\t\tvariants: [
{variants_lines}
\t\t],
\t\thelp: {{
\t\t\tdescription: tr("Allow to reply only users with chosen or higher group.")
\t\t}}
\t}}) %>"""

    # === Обычный input_constructor ===
    is_int = ptype == 'int'
    extras = ""

    # Variants из enum
    if enum_vals and not is_int:
        variants = ','.join(f'"{v}"' for v in enum_vals)
        extras += f",\n\t\tvariants: [{variants}]"

    # Examples
    if name in PARAM_EXAMPLES:
        ex_lines = []
        for ex in PARAM_EXAMPLES[name]:
            if 'desc_key' in ex:
                ex_lines.append(
                    f'{{\tcode: "{ex["code"]}", description: tr("{ex["desc_key"]}") + " " + '
                    f'tr("Must be separated by <code>,</code>.")}}'
                )
            else:
                ex_lines.append(f'{{code: "{ex["code"]}"}}')
        extras += ",\n\t\t\texamples: [\n\t\t\t\t" + ",\n\t\t\t\t".join(ex_lines) + "\n\t\t\t]"

    # File params: base64
    if name in FILE_PARAMS:
        desc = f"Base64 data of the {name}."

    return f"""\t<%= _.template($('#input_constructor').html())({{
\t\tid: "{name}",
\t\tdescription: tr("{name}"),
\t\tdefault_selector: "{'int' if is_int else 'string'}",
\t\t{'disable_string: true' if is_int else 'disable_int: true'},
\t\t{'value_number: ""' if is_int else 'value_string: ""'}{extras},
\t\thelp: {{
\t\t\tdescription: tr("{desc}")
\t\t}}
\t}}) %>"""


def gen_interface_js(action_name, all_params, tooltip_en):
    lines = ['<div class="container-fluid">']

    required = [p for p in all_params if p.get('required') or p.get('in') == 'path']
    optional = [p for p in all_params if not p.get('required') and p.get('in') != 'path']

    for p in required:
        lines.append(_render_param_widget(p))

    if optional:
        lines.append("""\t<%= _.template($('#block_start').html())({
\t\tid:"Options",
\t\tname: tr("Options"),
\t\tdescription: tr("All fields of this group are optional")
\t}) %>""")
        for p in optional:
            lines.append(_render_param_widget(p))
        lines.append("\t<%= _.template($('#block_end').html())() %>")

    # Requests block
    lines.append(_gen_requests_block())
    lines.append(_gen_variable_constructor())
    lines.append('</div>')

    # Tooltip
    lines.append('<div class="tooltipinternal">')
    lines.append(f'\t<div class="tr tooltip-paragraph-first-fold">{tooltip_en}</div>')
    lines.append('</div>')
    lines.append('<%= _.template($(\'#back\').html())({action:"executeandadd", visible:true}) %>')
    lines.append(_gen_button_script())
    return "\n".join(lines)


# =============================================================================
# Генерация _select.js — с учётом checkbox, GetInputConstructorValue
# =============================================================================

def gen_select_js(action_name, all_params):
    lines = []
    required = [p for p in all_params if p.get('required') or p.get('in') == 'path']
    optional = [p for p in all_params if not p.get('required') and p.get('in') != 'path']

    for p in required:
        name = snake_to_camel(p['name']) if p.get('in') == 'path' else p['name']
        if get_param_type(p) == 'boolean':
            lines.append(f'var {name} = $("#{name}").is(\':checked\');')
        else:
            lines.append(f"var {name} = GetInputConstructorValue('{name}', loader)")
            lines.append(f"if ({name}['original'].length == 0) {{")
            lines.append(f"\tInvalid(tr('The parameter \"') + tr('{name}') + tr('\" is not specified'))")
            lines.append(f"\treturn")
            lines.append(f"}}")

    if optional:
        lines.append("")
    for p in optional:
        name = p['name']
        if get_param_type(p) == 'boolean':
            lines.append(f'var {name} = $("#{name}").is(\':checked\');')
        else:
            lines.append(f"var {name} = GetInputConstructorValue('{name}', loader)")

    # Timeout block
    for tp in ['timeout', 'interval', 'maxTime']:
        label = {'timeout': 'Timeout', 'interval': 'Interval', 'maxTime': 'Time threshold'}[tp]
        lines.append(f"")
        lines.append(f"var {tp} = GetInputConstructorValue('{tp}', loader)")
        lines.append(f"if ({tp}['original'].length == 0) {{")
        lines.append(f"\tInvalid(tr('The parameter \"') + tr('{label}') + tr('\" is not specified'))")
        lines.append(f"\treturn")
        lines.append(f"}}")

    lines.append("var Save = this.$el.find('#Save').val().toUpperCase()")
    lines.append("try {")
    lines.append("\tvar code =")
    lines.append("\t\tloader.GetAdditionalData() +")
    lines.append(f"\t\t_.template($('#{action_name}_code').html())({{")

    tpl = []
    for p in all_params:
        name = snake_to_camel(p['name']) if p.get('in') == 'path' else p['name']
        if get_param_type(p) == 'boolean':
            tpl.append(f"\t\t\t{name}: {name}")
        else:
            tpl.append(f"\t\t\t{name}: {name}['updated']")
    tpl.extend([
        "\t\t\ttimeout: timeout['updated']",
        "\t\t\tmaxTime: maxTime['updated']",
        "\t\t\tinterval: interval['updated']",
        "\t\t\tvariable: 'VAR_' + Save",
    ])
    lines.append(",\n".join(tpl))
    lines.append("\t\t})")
    lines.append("\tcode = Normalize(code, 0)")
    lines.append("\tBrowserAutomationStudio_Append(")
    lines.append("\t\t'',")
    lines.append("\t\tBrowserAutomationStudio_SaveControls() + code,")
    lines.append("\t\taction,")
    lines.append("\t\tDisableIfAdd")
    lines.append("\t)")
    lines.append("} catch (e) {}")
    return "\n".join(lines)


# =============================================================================
# Генерация engine.js метода
# =============================================================================

def gen_engine_method(endpoint):
    method = endpoint['method']
    path = endpoint['path']
    scopes = endpoint['scopes']
    path_vars = re.findall(r'\{(\w+)\}', path)

    qparams = [p for p in endpoint['params']
               if p.get('in') == 'query' and p['name'] not in SKIP_PARAMS]
    bparams = [p for p in endpoint['body_params']
               if p['name'] not in SKIP_PARAMS
               and p.get('schema', {}).get('format') != 'binary']

    # Определяем нужны ли костыли для boolean→int или comma-split
    all_ep_params = qparams + bparams
    bool_converts = [p['name'] for p in all_ep_params if p['name'] in BOOL_TO_INT_PARAMS]
    split_converts = {p['name']: COMMA_SPLIT_PARAMS[p['name']]
                      for p in all_ep_params if p['name'] in COMMA_SPLIT_PARAMS}

    L = []
    L.append("\t\tfunction () {")
    L.append("\t\t\tvar ctxt = _arguments()")
    L.append("")

    # Boolean → int conversion
    if bool_converts:
        L.append("\t\t\tvar list_ctxt = [")
        L.append(",\n".join(f'\t\t\t\t"{n}"' for n in bool_converts))
        L.append("\t\t\t]")
        L.append("")
        L.append("\t\t\tlist_ctxt.forEach(function (key) {")
        L.append("\t\t\t\tif (ctxt[key]) {")
        L.append("\t\t\t\t\tctxt[key] = 1")
        L.append("\t\t\t\t}")
        L.append("\t\t\t})")
        L.append("")

    # Comma-split params
    if split_converts:
        for param_name, api_name in split_converts.items():
            if api_name:
                L.append(f"\t\t\tif (ctxt.{param_name}) {{")
                L.append(f"\t\t\t\tctxt['{api_name}'] = ctxt.{param_name}.split(',')")
                L.append(f"\t\t\t\tdelete ctxt.{param_name}")
                L.append(f"\t\t\t}}")
                L.append("")

    # Query params — cleanObject
    clean_names = []
    for p in qparams:
        n = p['name']
        if n in split_converts and split_converts[n]:
            clean_names.append(split_converts[n])
        else:
            clean_names.append(n)
    for p in bparams:
        n = p['name']
        if n in split_converts and split_converts[n]:
            clean_names.append(split_converts[n])

    if qparams:
        qnames_str = ', '.join(f"'{n}'" for n in [p['name'] for p in qparams])
        L.append(f"\t\t\tvar params = _LZTAPI.tools.cleanObject(ctxt, [{qnames_str}])")
    L.append("")

    L.append("\t\t\tvar timeout = Number(ctxt.timeout) || 5000")
    L.append("\t\t\tvar interval = Number(ctxt.interval) || 3000")
    L.append("\t\t\tvar maxTime = Number(ctxt.maxTime) || 60000")
    L.append("")

    # Path
    path_js = f"'{path}'"
    for pv in path_vars:
        path_js = path_js.replace('{' + pv + '}', f"' + ctxt.{snake_to_camel(pv)} + '")
    path_js = re.sub(r" \+ ''$", "", path_js)
    L.append(f"\t\t\tvar path = {path_js}")
    L.append("")

    # Body data
    has_body = bparams  # Любой метод может иметь body (включая DELETE)
    if has_body:
        bnames_str = ', '.join(f"'{p['name']}'" for p in bparams)
        L.append(f"\t\t\tvar dataJ = _LZTAPI.tools.cleanObject(ctxt, [{bnames_str}])")
        L.append("")

    # Request
    L.append("\t\t\t_call_function(_LZTAPI.request.make, {")
    req = [
        "\t\t\t\tpath: path",
        f"\t\t\t\tparams: {'params' if qparams else 'null'}",
        "\t\t\t\ttimeout: timeout",
        "\t\t\t\tinterval: interval",
        "\t\t\t\tmaxTime: maxTime",
        f"\t\t\t\tmethod: '{method}'",
    ]
    if has_body:
        req.append("\t\t\t\tdataJ: dataJ")
    elif method in ('POST', 'PUT', 'PATCH'):
        req.append("\t\t\t\tdataJ: null")
    req.append(f"\t\t\t\tscopes: [{', '.join(repr(s) for s in scopes)}]")
    L.append(",\n".join(req))
    L.append("\t\t\t})!")
    L.append("")
    L.append("\t\t\t_function_return(_result_function())")
    L.append("\t\t}")
    return "\n".join(L)


# =============================================================================
# Вспомогательные шаблоны
# =============================================================================

def _gen_requests_block():
    return """\t<%= _.template($('#block_start').html())({
\t\tid:"Requests",
\t\tname: tr("Requests delivery"),
\t\tdescription: tr("It is recommended to leave the default settings, or increase them if you have a slow Internet connection")
\t}) %>
\t\t<%= _.template($('#input_constructor').html())({
\t\t\tid: "timeout",
\t\t\tdescription: tr("Timeout"),
\t\t\tdefault_selector: "int",
\t\t\tdisable_string: true,
\t\t\tvalue_number: 5,
\t\t\tmin_number: 1,
\t\t\tmax_number: 60,
\t\t\thelp: {
\t\t\t\tdescription: tr("Maximum waiting time per request."),
\t\t\t\texamples: [
\t\t\t\t\t{code: 1, description: tr("Wait 1 second.")},
\t\t\t\t\t{code: 5, description: tr("Wait 5 seconds.")},
\t\t\t\t\t{code: 10, description: tr("Wait 10 seconds.")}
\t\t\t\t]
\t\t\t}
\t\t}) %>
\t\t<%= _.template($('#input_constructor').html())({
\t\t\tid: "interval",
\t\t\tdescription: tr("Interval"),
\t\t\tdefault_selector: "int",
\t\t\tdisable_string: true,
\t\t\tvalue_number: 3,
\t\t\tmin_number: 1,
\t\t\tmax_number: 1200,
\t\t\thelp: {
\t\t\t\tdescription: tr("Interval for sending requests."),
\t\t\t\texamples: [
\t\t\t\t\t{code: 1, description: tr("Send request every second.")},
\t\t\t\t\t{code: 5, description: tr("Send request every 5 seconds.")},
\t\t\t\t\t{code: 10, description: tr("Send request every 10 seconds.")}
\t\t\t\t]
\t\t\t}
\t\t}) %>
\t\t<%= _.template($('#input_constructor').html())({
\t\t\tid: "maxTime",
\t\t\tdescription: tr("Time threshold"),
\t\t\tdefault_selector: "int",
\t\t\tdisable_string: true,
\t\t\tvalue_number: 10,
\t\t\tmin_number: 1,
\t\t\tmax_number: 1000000,
\t\t\thelp: {
\t\t\t\tdescription: tr("Maximum execution time."),
\t\t\t\texamples: [
\t\t\t\t\t{code: 1, description: tr("Perform an action no more than 1 second.")},
\t\t\t\t\t{code: 5, description: tr("Perform an action no more than 5 seconds.")},
\t\t\t\t\t{code: 10, description: tr("Perform an action no more than 10 seconds.")}
\t\t\t\t]
\t\t\t}
\t\t}) %>
\t<%= _.template($('#block_end').html())() %>"""


def _gen_variable_constructor():
    return """\t<%= _.template($('#variable_constructor').html())({
\t\tid: "Save",
\t\tdescription: tr("Variable to save the result"),
\t\tdefault_variable: "LZTAPI_RESPONSE",
\t}) %>"""


def _gen_button_script():
    return """<script type="text/javascript">
\t$(document).ready(function(){
\t\tlet lztOkButton = document.getElementById('ok')
\t\tlztOkButton.style.backgroundColor = '#2BAD72'
\t\tlztOkButton.style.borderColor = '#009a63'
\t\tlet lztBackButton = document.getElementById('backtomain')
\t\tlztBackButton.style.backgroundColor = '#884444'
\t\tlztBackButton.style.borderColor = '#884535'
\t});
</script>"""


# =============================================================================
# Парсинг и сравнение
# =============================================================================

def parse_endpoints(schema):
    endpoints = []
    for path, methods in schema.get('paths', {}).items():
        for method, op in methods.items():
            if method not in ('get', 'post', 'put', 'delete', 'patch'):
                continue
            op_id = op.get('operationId', '')
            if not op_id:
                continue

            params = []
            for p in op.get('parameters', []):
                if '$ref' in p:
                    resolved = resolve_ref_param(p['$ref'])
                    if resolved:
                        params.append(resolved)
                else:
                    params.append(p)

            endpoints.append({
                'path': path,
                'method': method.upper(),
                'operation_id': op_id,
                'summary': op.get('summary', ''),
                'description': op.get('description', ''),
                'tags': op.get('tags', []),
                'params': params,
                'body_params': get_body_params(op),
                'scopes': get_scopes_from_security(op.get('security', [])),
            })
    return endpoints


def parse_code_js_params(filepath):
    """Извлекает имена параметров из _code.js (ищет <%= paramName %>)."""
    skip = {'variable', 'timeout', 'interval', 'maxTime'}
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        params = set(re.findall(r'<%=\s*(\w+)\s*%>', content))
        return params - skip
    except FileNotFoundError:
        return set()


def find_code_js(module_dir, action_name, manifest):
    """Находит путь к _code.js для действия из manifest."""
    for a in manifest.get('actions', []):
        if a['name'] == action_name:
            for code_entry in a.get('code', []):
                code_path = os.path.join(module_dir, code_entry['file'])
                if os.path.exists(code_path):
                    return code_path
    # Fallback — поиск в корне и src/
    for root, _, files in os.walk(module_dir):
        fname = f"{action_name}_code.js"
        if fname in files:
            return os.path.join(root, fname)
    return None


def get_schema_param_names(ep):
    """Получает имена QUERY и BODY параметров для сравнения.
    Path-параметры исключаются — они структурные, всегда присутствуют."""
    names = set()
    for p in ep['params']:
        if p['name'] not in SKIP_PARAMS and p.get('in') != 'path':
            names.add(p['name'])
    for p in ep['body_params']:
        if p['name'] not in SKIP_PARAMS:
            names.add(p['name'])
    return names


def get_path_param_names(ep):
    """Возвращает все формы path-параметров (snake + camel) для исключения."""
    names = set()
    for p in ep['params']:
        if p.get('in') == 'path':
            names.add(p['name'])
            names.add(snake_to_camel(p['name']))
    return names


def get_existing_actions(module_dir):
    for name in ['manifest.json', 'test_manifest.json']:
        path = os.path.join(module_dir, name)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            return {a['name'] for a in manifest.get('actions', [])}, manifest
    return set(), {}


def filter_params(endpoint):
    """Фильтрует параметры, убирает технические."""
    result = []
    for p in endpoint['params']:
        if p['name'] not in SKIP_PARAMS:
            result.append(p)
    for p in endpoint['body_params']:
        if p['name'] not in SKIP_PARAMS and p.get('schema', {}).get('format') != 'binary':
            result.append(p)
    return result


# =============================================================================
# Генерация файлов
# =============================================================================

def generate_action(action_name, ep, output_dir, subdir):
    engine_path = get_engine_path(ep['operation_id'])
    if not engine_path:
        return None

    all_params = filter_params(ep)
    tooltip_en, tooltip_ru = get_tooltip(ep['operation_id'], ep.get('summary', ''))

    # Определяем папку из FOLDER_MAP или автоматически
    folder = action_to_folder(action_name)
    full_subdir = f"{subdir}/{folder}" if subdir else folder

    out = os.path.join(output_dir, full_subdir)
    os.makedirs(out, exist_ok=True)

    code = gen_code_js(action_name, engine_path, all_params)
    iface = gen_interface_js(action_name, all_params, tooltip_en)
    select = gen_select_js(action_name, all_params)

    for suffix, content in [('_code.js', code), ('_interface.js', iface), ('_select.js', select)]:
        with open(os.path.join(out, action_name + suffix), 'w', encoding='utf-8') as f:
            f.write(content)

    return {
        'name': action_name,
        'tooltip_en': tooltip_en,
        'tooltip_ru': tooltip_ru,
        'engine_path': engine_path,
        'engine_code': gen_engine_method(ep),
        'folder': folder,
    }


def gen_manifest_entry(info, subdir):
    folder = info.get('folder', '')
    rel = f"{subdir}/{folder}" if subdir else folder
    name = info['name']

    return {
        "name": name,
        "description": {"en": info['tooltip_en'], "ru": info['tooltip_ru']},
        "template": "-> {{Save}}",
        "is_element": False,
        "interface": f"{rel}/{name}_interface.js",
        "select": f"{rel}/{name}_select.js",
        "code": [{"file": f"{rel}/{name}_code.js", "name": f"{name}_code"}]
    }


# =============================================================================
# Main
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description='LOLZTEAM API BAS Module Codegen v2')
    parser.add_argument('--schema', required=True, help='OpenAPI JSON path')
    parser.add_argument('--module-dir', default='.', help='BAS module directory')
    parser.add_argument('--mode', choices=['diff', 'generate', 'update'], default='diff')
    parser.add_argument('--output-dir', default='generated', help='Output directory')
    parser.add_argument('--subdir', default='src', help='Subdirectory for files')
    args = parser.parse_args()

    print(f"[*] Loading schema: {args.schema}")
    with open(args.schema, 'r', encoding='utf-8') as f:
        schema = json.load(f)
    print(f"    API version: {schema['info']['version']}")

    endpoints = parse_endpoints(schema)
    print(f"    Endpoints: {len(endpoints)}")

    existing, manifest = get_existing_actions(args.module_dir)
    print(f"[*] Existing actions: {len(existing)}")

    # === Классификация эндпоинтов ===
    new_eps, exist_eps, skipped = [], [], []
    schema_action_names = set()

    for ep in endpoints:
        action = operation_id_to_action_name(ep['operation_id'], ep['method'])
        if action is None:
            skipped.append(ep['operation_id'])
        elif action in existing:
            exist_eps.append((action, ep))
            schema_action_names.add(action)
        else:
            new_eps.append((action, ep))

    # === REMOVED: есть в модуле, но нет в API схеме ===
    # Действия которые НЕ нужно проверять на удаление (системные, не из API)
    system_actions = {'lztapi_settings', 'lztapi_batch_record', 'lztapi_batch_stop'}
    removed_actions = []
    for action_name in sorted(existing):
        if action_name not in schema_action_names and action_name not in system_actions:
            removed_actions.append(action_name)

    # === CHANGED: параметры изменились ===
    changed_actions = []
    for action_name, ep in exist_eps:
        code_path = find_code_js(args.module_dir, action_name, manifest)
        if not code_path:
            continue
        current_params = parse_code_js_params(code_path)
        schema_params = get_schema_param_names(ep)
        path_params = get_path_param_names(ep)

        # Исключаем path-параметры из _code.js (они структурные)
        current_params = current_params - path_params

        added_params = schema_params - current_params
        removed_params = current_params - schema_params

        if added_params or removed_params:
            changed_actions.append({
                'name': action_name,
                'endpoint': ep,
                'added': sorted(added_params),
                'removed': sorted(removed_params),
            })

    # === Вывод результатов ===
    print(f"\n{'='*60}")
    print(f"  NEW:      {len(new_eps)}")
    print(f"  REMOVED:  {len(removed_actions)}")
    print(f"  CHANGED:  {len(changed_actions)}")
    print(f"  EXISTING: {len(exist_eps) - len(changed_actions)} (без изменений)")
    print(f"  SKIPPED:  {len(skipped)}")
    print(f"{'='*60}")

    if new_eps:
        print("\n  [+] New endpoints:")
        for name, ep in new_eps:
            print(f"      + {name}  ({ep['method']} {ep['path']})")

    if removed_actions:
        print("\n  [-] Removed (exist in module but NOT in API schema):")
        for name in removed_actions:
            print(f"      - {name}")

    if changed_actions:
        print("\n  [~] Changed parameters:")
        for ch in changed_actions:
            ep = ch['endpoint']
            print(f"      ~ {ch['name']}  ({ep['method']} {ep['path']})")
            if ch['added']:
                print(f"        + params added:   {', '.join(ch['added'])}")
            if ch['removed']:
                print(f"        - params removed: {', '.join(ch['removed'])}")

    if skipped:
        print(f"\n  Skipped operationIds: {', '.join(skipped)}")

    if args.mode == 'diff':
        os.makedirs(args.output_dir, exist_ok=True)
        _save_changelog(new_eps, removed_actions, changed_actions, args.output_dir)
        return

    if not new_eps:
        print("\n[*] Nothing to generate.")
        return

    os.makedirs(args.output_dir, exist_ok=True)

    # Backup
    if args.mode == 'update':
        bak = os.path.join(args.output_dir, f"backup_{datetime.now():%Y%m%d_%H%M%S}")
        os.makedirs(bak, exist_ok=True)
        mf = os.path.join(args.module_dir, 'manifest.json')
        if os.path.exists(mf):
            shutil.copy2(mf, bak)
        print(f"[*] Backup: {bak}")

    results = []
    for name, ep in new_eps:
        print(f"  [+] {name}")
        info = generate_action(name, ep, args.output_dir, args.subdir)
        if info:
            results.append(info)

    # Save manifest entries
    manifest_entries = [gen_manifest_entry(r, args.subdir) for r in results]
    with open(os.path.join(args.output_dir, 'new_manifest_actions.json'), 'w', encoding='utf-8') as f:
        json.dump(manifest_entries, f, indent=2, ensure_ascii=False)

    # Save engine methods
    with open(os.path.join(args.output_dir, 'new_engine_methods.js'), 'w', encoding='utf-8') as f:
        f.write(f"// Generated: {datetime.now().isoformat()}\n\n")
        for r in results:
            f.write(f"// _LZTAPI.{r['engine_path']}\n")
            f.write(r['engine_code'] + "\n\n")

    # Save translations
    translations = {}
    for name, ep in new_eps:
        for p in ep['params'] + ep['body_params']:
            d = p.get('description', '')
            if d and d not in (manifest.get('localize', {}) if manifest else {}):
                translations[d] = {"ru": f"[TODO] {d}"}
    if translations:
        with open(os.path.join(args.output_dir, 'new_translations.json'), 'w', encoding='utf-8') as f:
            json.dump(translations, f, indent=2, ensure_ascii=False)

    _save_changelog(new_eps, removed_actions, changed_actions, args.output_dir)

    print(f"\n{'='*60}")
    print(f"  Generated: {len(results)} actions")
    print(f"  Location:  {args.output_dir}/{args.subdir}/")
    print(f"{'='*60}")
    print(f"\n  Next steps:")
    print(f"  1. Review files in {args.output_dir}/")
    print(f"  2. Fill [TODO] translations in new_translations.json")
    print(f"  3. Merge new_manifest_actions.json → manifest.json")
    print(f"  4. Merge new_engine_methods.js → engine.js")
    if removed_actions:
        print(f"  5. Remove {len(removed_actions)} deprecated action(s) from manifest + engine + files")
    if changed_actions:
        step = 6 if removed_actions else 5
        print(f"  {step}. Update {len(changed_actions)} changed action(s) — see CHANGELOG.txt")
    print(f"  !. Test in BAS")


def _save_changelog(new_eps, removed_actions, changed_actions, output_dir):
    with open(os.path.join(output_dir, 'CHANGELOG.txt'), 'w', encoding='utf-8') as f:
        f.write(f"# LOLZTEAM API Module Changelog\n")
        f.write(f"# Generated: {datetime.now().isoformat()}\n")
        f.write(f"# New: {len(new_eps)}  Removed: {len(removed_actions)}  Changed: {len(changed_actions)}\n")

        if new_eps:
            f.write(f"\n{'='*50}\n")
            f.write(f"  NEW ENDPOINTS ({len(new_eps)})\n")
            f.write(f"{'='*50}\n\n")
            for name, ep in new_eps:
                params = ', '.join(p['name'] for p in ep['params'] + ep['body_params'])
                f.write(f"+ {name}\n")
                f.write(f"  {ep['method']} {ep['path']}\n")
                f.write(f"  operationId: {ep['operation_id']}\n")
                f.write(f"  params: {params}\n\n")

        if removed_actions:
            f.write(f"\n{'='*50}\n")
            f.write(f"  REMOVED ({len(removed_actions)})\n")
            f.write(f"  Exist in module but NOT in API schema.\n")
            f.write(f"  Review and delete if no longer needed.\n")
            f.write(f"{'='*50}\n\n")
            for name in removed_actions:
                f.write(f"- {name}\n")

        if changed_actions:
            f.write(f"\n{'='*50}\n")
            f.write(f"  CHANGED PARAMETERS ({len(changed_actions)})\n")
            f.write(f"  Params differ between module and API schema.\n")
            f.write(f"{'='*50}\n\n")
            for ch in changed_actions:
                ep = ch['endpoint']
                f.write(f"~ {ch['name']}\n")
                f.write(f"  {ep['method']} {ep['path']}\n")
                if ch['added']:
                    f.write(f"  + NEW params:     {', '.join(ch['added'])}\n")
                if ch['removed']:
                    f.write(f"  - MISSING params: {', '.join(ch['removed'])}\n")
                f.write(f"\n")


if __name__ == '__main__':
    main()