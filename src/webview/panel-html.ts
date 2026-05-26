/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { getNonce } from './panel-shared';
import { FF_TOKEN_REPORTING_ENABLED } from '../core/constants';

export function getDashboardHtml(webview: vscode.Webview, extensionUri: vscode.Uri): string {
  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview', 'app.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'dist', 'webview', 'styles.css'));
  const nonce = getNonce();

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} data:; font-src ${webview.cspSource}; require-trusted-types-for 'script'; trusted-types coach-html default;">
<link href="${String(styleUri)}" rel="stylesheet">
<title>AI Engineer Coach</title>
</head>
<body>
<div id="app">
  <nav id="sidebar">
    <ul class="nav-links">
      <li class="nav-group-header">Наблюдение</li>
      <li><a href="#" data-page="dashboard" class="active"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="8" width="3" height="6" rx="0.5" fill="currentColor"/><rect x="5.5" y="5" width="3" height="9" rx="0.5" fill="currentColor"/><rect x="10" y="2" width="3" height="12" rx="0.5" fill="currentColor"/></svg></span> Панель управления</a></li>
      <li><a href="#" data-page="timeline"><span class="nav-icon">&#9472;</span> Хронология<span class="nav-badge" id="badge-sessions"></span></a></li>
      <li><a href="#" data-page="image-gallery"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.2"/><circle cx="5.5" cy="6.5" r="1.2" stroke="currentColor" stroke-width="1"/><path d="M2 11l3-3 2 2 4-4 3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span> Моменты кодинга</a></li>
      <li class="nav-group-header">Измерение</li>
      <li><a href="#" data-page="output"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12L6 7L9 9.5L14 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 3H14V6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span> Выработка кода</a></li>
      ${FF_TOKEN_REPORTING_ENABLED ? '<li><a href="#" data-page="burndown"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3L8 8L14 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" stroke-dasharray="2 2"/><path d="M2 3L6 9L10 7L14 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><line x1="2" y1="13" x2="14" y2="13" stroke="currentColor" stroke-width="1" opacity="0.3"/></svg></span> Расход токенов<span class="nav-badge" id="badge-burndown"></span></a></li>' : ''}
      <li><a href="#" data-page="patterns"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/><rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.5"/><rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.5"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/></svg></span> Паттерны</a></li>
      <li class="nav-group-header">Улучшение</li>
      <li><a href="#" data-page="anti-patterns"><span class="nav-icon">&#9888;</span> Антипаттерны<span class="nav-badge" id="badge-antipatterns"></span></a></li>
      <li><a href="#" data-page="skills"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="4" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><circle cx="12" cy="4" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><circle cx="8" cy="13" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/><line x1="4" y1="6.5" x2="8" y2="10.5" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="6.5" x2="8" y2="10.5" stroke="currentColor" stroke-width="1.2"/></svg></span> Поиск навыков<span class="nav-badge" id="badge-skills"></span></a></li>
      <li><a href="#" data-page="config-health"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L1.5 4.5V11.5L8 15L14.5 11.5V4.5Z" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M8 5.5V10.5M5.5 8H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span> Здоровье контекста</a></li>
      <li><a href="#" data-page="level-up"><span class="nav-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 5h5l-4 3.5 1.5 5L8 11.5 3.5 14.5 5 9.5 1 6h5z" stroke="currentColor" stroke-width="1.2" fill="none"/></svg></span> Достижения</a></li>
    </ul>
    <div class="sidebar-filters">
      <div class="sidebar-filter">
        <label>Рабочая область</label>
        <div class="ws-toggle" id="ws-toggle">
          <button class="ws-toggle-btn active" data-ws="current">Текущая</button>
          <button class="ws-toggle-btn" data-ws="all">Все</button>
        </div>
        <div class="combobox" id="ws-combobox">
          <input type="text" id="ws-filter-input" placeholder="Поиск рабочих областей..." autocomplete="off" />
          <div class="combobox-list" id="ws-filter-list"></div>
          <input type="hidden" id="ws-filter" />
        </div>
      </div>
      <div class="sidebar-filter">
        <label for="harness-filter">Ассистент</label>
        <select id="harness-filter"><option value="">Все ассистенты</option></select>
      </div>
    </div>
  </nav>
  <main id="content"></main>
</div>

<script nonce="${nonce}">
(function() {
  const dict = {
    // Боковая панель (на всякий случай для динамического обновления)
    "Observe": "Наблюдение",
    "Dashboard": "Панель управления",
    "Timeline": "Хронология",
    "Coding Moments": "Моменты кодинга",
    "Measure": "Измерение",
    "Output": "Выработка кода",
    "Burndown": "Расход токенов",
    "Patterns": "Паттерны",
    "Improve": "Улучшение",
    "Anti-Patterns": "Антипаттерны",
    "Skill Finder": "Поиск навыков",
    "Context Health": "Здоровье контекста",
    "Level Up": "Достижения",
    "Workspace": "Рабочая область",
    "Current": "Текущая",
    "All": "Все",
    "Search workspaces...": "Поиск рабочих областей...",
    "Harness": "Ассистент",
    "All Harnesses": "Все ассистенты",

    // Общий дашборд
    "better agentic engineering.": "эффективная агентная разработка.",
    "Practice Score": "Оценка практики",
    "Weekly Activity": "Активность за неделю",
    "Daily Activity": "Активность за день",
    "AI-generated code volume": "Объем ИИ-генерируемого кода",
    "by language": "по языкам",
    "by workspace": "по рабочим областям",
    "by model": "по моделям",
    "by harness": "по ассистентам",
    "No data available": "Нет данных",
    "Learn More": "Подробнее",
    "Discovering log directories": "Поиск директорий логов",
    "Checking cache": "Проверка кэша",
    "Parsing session logs": "Анализ логов сессий",
    "Scanning external harnesses": "Сканирование внешних инструментов",
    "Preparing analytics": "Подготовка аналитики",
    "Ready": "Готово",

    // Метрики
    "Requests": "Запросы",
    "Sessions": "Сессии",
    "Avg Prompt Length": "Ср. длина промпта",
    "Avg Response Length": "Ср. длина ответа",
    "Lines of code": "Строк кода",
    "Tool calls": "Вызовы инструментов",
    "Images analyzed": "Изображений проанализировано",
    "Files edited": "Файлов отредактировано",
    "Avg Prompt Length": "Ср. длина промпта",
    "Avg Response Length": "Ср. длина ответа",

    // Таймлайн
    "AI Session Log": "Журнал ИИ-сессий",
    "No sessions found": "Сессии не найдены",
    "Select a session to view details": "Выберите сессию для просмотра деталей",
    "User Prompt": "Запрос пользователя",
    "AI Response": "Ответ ИИ",
    "Context Files": "Файлы контекста",
    "Tools Used": "Использованные инструменты",
    "Edited Files": "Отредактированные файлы",
    "Timings": "Время выполнения",
    "Total time": "Всего времени",
    "First progress": "Первый прогресс",
    "Canceled": "Отменено",
    "Model": "Модель",
    "Agent Mode": "Режим агента",
    "Slash Command": "Слэш-команда",

    // Антипаттерны
    "Anti-Pattern Alerts": "Ошибки взаимодействия",
    "High Risk": "Высокий риск",
    "Medium Risk": "Средний риск",
    "Low Risk": "Низкий риск",
    "All Rules": "Все правила",
    "Rule Name": "Название правила",
    "Category": "Категория",
    "Severity": "Важность",
    "Count": "Количество",
    "Description": "Описание",
    "How to fix": "Как исправить",
    "Matched files": "Совпавшие файлы",
    "Review Local Rule Approvals": "Просмотр утвержденных локальных правил",
    "Rules Catalog": "Каталог правил",
    "Prompt Quality": "Качество промптов",
    "Session Hygiene": "Гигиена сессий",
    "Context Management": "Управление контекстом",
    "Tool Mastery": "Владение инструментами",
    "Code Review": "Код-ревью",

    // Навыки (Skill Finder)
    "Repeated Prompts": "Повторяющиеся промпты",
    "Repeated prompt patterns that could be reusable skills": "Повторяющиеся шаблоны промптов, которые можно превратить в навыки",
    "Create Custom Skill": "Создать пользовательский навык",
    "Prompts": "Промпты",
    "Occurrences": "Повторения",
    "Suggested Name": "Предлагаемое имя",
    "Save Skill": "Сохранить навык",

    // Здоровье контекста (Context Health)
    "Workspace Context Quality": "Качество контекста рабочей области",
    "Instruction files (.instructions.md, agents.md)": "Файлы инструкций (.instructions.md, agents.md)",
    "Context composition": "Состав контекста",
    "Token efficiency": "Эффективность токенов",
    "Score": "Оценка",
    "Instruction files found": "Найдены файлы инструкций",
    "No instruction files found": "Файлы инструкций не найдены",
    "Recommendations": "Рекомендации",
    "Large files in context": "Большие файлы в контексте",
    "Redundant context": "Избыточный контекст",

    // Достижения (Level Up)
    "Practice achievements and milestones": "Достижения и рубежи практики",
    "Completed": "Завершено",
    "In Progress": "В процессе",
    "Locked": "Заблокировано",
    "Earned on": "Получено",
    "Progress": "Прогресс",

    // Ошибки
    "No Copilot chat log directories found.": "Не найдены директории логов ассистентов.",
    "Error": "Ошибка",
    "Failed to load data": "Не удалось загрузить данные"
  };

  const regexes = [
    { pattern: /^(\d+)\s+requests$/, replace: "$1 запросов" },
    { pattern: /^(\d+)\s+sessions$/, replace: "$1 сессий" },
    { pattern: /^(\d+)\s+lines\s+of\s+code$/, replace: "$1 строк кода" },
    { pattern: /^(\d+)\s+tool\s+calls$/, replace: "$1 вызовов инструментов" },
    { pattern: /^(\d+)\s+images\s+analyzed$/, replace: "$1 изображений проанализировано" },
    { pattern: /^(\d+)\s+files\s+edited$/, replace: "$1 файлов отредактировано" },
    { pattern: /^(\d+)\s+requests,\s+(\d+)\s+sessions$/, replace: "$1 запросов, $2 сессий" }
  ];

  function translateText(text) {
    const trimmed = text.trim();
    if (!trimmed) return text;

    // Точное совпадение
    if (dict[trimmed]) return dict[trimmed];

    // Регулярные выражения
    for (const rx of regexes) {
      if (rx.pattern.test(trimmed)) {
        return trimmed.replace(rx.pattern, rx.replace);
      }
    }

    // Частичные совпадения и шаблоны
    if (trimmed.startsWith("Requests: ")) {
      return trimmed.replace("Requests: ", "Запросы: ");
    }
    if (trimmed.startsWith("Sessions: ")) {
      return trimmed.replace("Sessions: ", "Сессии: ");
    }
    if (trimmed.startsWith("Last modified: ")) {
      return trimmed.replace("Last modified: ", "Изменено: ");
    }
    if (trimmed.startsWith("Last activity: ")) {
      return trimmed.replace("Last activity: ", "Активность: ");
    }
    if (trimmed.startsWith("Earned on ")) {
      return trimmed.replace("Earned on ", "Получено ");
    }
    if (trimmed.startsWith("Total time: ")) {
      return trimmed.replace("Total time: ", "Всего времени: ");
    }
    if (trimmed.startsWith("First progress: ")) {
      return trimmed.replace("First progress: ", "Первый прогресс: ");
    }
    if (trimmed.startsWith("Model: ")) {
      return trimmed.replace("Model: ", "Модель: ");
    }
    if (trimmed.startsWith("Agent Mode: ")) {
      return trimmed.replace("Agent Mode: ", "Режим агента: ");
    }
    if (trimmed.startsWith("Slash Command: ")) {
      return trimmed.replace("Slash Command: ", "Слэш-команда: ");
    }
    if (trimmed.includes(" requests, ")) {
      return trimmed.replace(" requests", " запросов").replace(" sessions", " сессий");
    }

    return text;
  }

  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const originalVal = node.nodeValue;
      const translatedVal = translateText(originalVal);
      if (originalVal !== translatedVal) {
        node.nodeValue = translatedVal;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Игнорируем скрипты и стили
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

      // Перевод placeholder
      if (node.hasAttribute('placeholder')) {
        const placeholder = node.getAttribute('placeholder');
        node.setAttribute('placeholder', translateText(placeholder));
      }

      // Перевод title
      if (node.hasAttribute('title')) {
        const title = node.getAttribute('title');
        node.setAttribute('title', translateText(title));
      }

      // Рекурсивно обходим дочерние узлы
      node.childNodes.forEach(child => translateNode(child));
    }
  }

  // Запуск первичного перевода всего DOM
  function translateAll() {
    translateNode(document.body);
  }

  // Настройка MutationObserver для перевода динамического контента
  const observer = new MutationObserver((mutations) => {
    observer.disconnect();
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => translateNode(node));
      } else if (mutation.type === 'characterData') {
        translateNode(mutation.target);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  // Запуск обсервации и первичного перевода после загрузки страницы
  window.addEventListener('DOMContentLoaded', () => {
    translateAll();
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  // Дополнительно запускаем перевод через интервалы (для асинхронных рендеров)
  setInterval(translateAll, 1000);
})();
</script>

<script nonce="${nonce}" src="${String(scriptUri)}"></script>
</body>
</html>`;
}

export function getErrorHtml(message: string): string {
  const escaped = message.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<style>
body { background: #0d1117; color: #e6edf3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
.error { text-align: center; max-width: 500px; }
.error h2 { color: #f85149; }
.error p { color: #8b949e; }
</style>
</head>
<body><div class="error"><h2>Ошибка</h2><p>${escaped}</p></div></body>
</html>`;
}