# Решение тестового задания для собеседования в компанию на позицию Frontend-разработчика в [Sasflix](https://sasflix.ru/)

![nuxt](https://img.shields.io/badge/nuxt%20js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
[![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![vue](https://img.shields.io/badge/3-41B883?style=for-the-badge&logo=vue.js&label=vue&labelColor=35495E)]()			
[![docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)]()

## Описание проекта
Этот проект представляет собой тестовое задание для вакансии Frontend-разработчика на Nuxt3/Vue3. Приложение реализует функционал отображения списка постов и отдельных страниц с комментариями с возможностью локально оставить реацию, а также удалить комментарий.

## Функционал приложения
- Отображение первых 5 постов из API на главной странице.
- Написание кода без использования готовых библиотек компонентов.
- Кликабельные кнопки лайка и дизлайка.
- Возможность удаления комментариев и изменение состояния и стилей кнопок локально.

## Используемые технологии
- Nuxt3
- Vue3
- TypeScript
- Pinia
- SCSS
- Docker

## Сторонний API
- Список постов: `https://dummyjson.com/posts`
- Комментарии к посту: `https://dummyjson.com/posts/${id_post}/comments`

## Установка и запуск

### Установка и запуск через Docker

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/passwordhash/sasflix-test-task.git
   ```
2. Перейдите в директорию проекта:
   ```bash
   cd sasflix-test-task
   ```
3. Постройте и запустите контейнер с помощью Makefile:
   ```bash
   make start
   ```
   
Makefile автоматически выполнит сборку и запуск Docker-контейнера, используя следующие команды:
- `make build`: создаст Docker-образ с использованием аргумента `NITRO_PORT`.
- `make run`: запустит контейнер в фоновом режиме, пробросив порты, указанные в файле `.env`.

Теперь ваше приложение будет доступно на порту, указанном в переменной `SASFLIX_PORT` (по умолчанию 3030).

### На свой пк

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/passwordhash/sasflix-test-task.git
   ```
2. Перейдите в директорию проекта:
   ```bash
   cd sasflix-test-task
   ```
3. Установите зависимости:
   ```bash
   npm install --save
   ```
4. Запустите проект:
   ```bash
   npm run dev
   ```

## Макет
- [Макет в Фигме](https://www.figma.com/design/FsK4iDHoGGstdfe9QzVZAP/sasflix-interview-template?node-id=0-1&t=7U6nJMUDlljtJLjU-1)


## Контакты
- Email: [iam@it-yaroslav.ru](mailto:iam@it-yaroslav.ru)
- Telegram: [@passwordhash](https://t.me/passwordhash)
