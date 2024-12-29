# AWT Site Core

## Описание
[**AWT Site Core**](https://github.com/AstraWebTech/awtSiteCore) — это серверный каркас для разработки веб-приложений с использованием Express, Vue.js и других современных технологий. Проект предоставляет гибкий и расширяемый функционал для построения приложений, включая управление базой данных, обработку изображений, пользовательскую авторизацию, предоставление API к базе данных и готовую административную часть приложения.

## Установка

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/AstraWebTech/awtSiteCore
   cd awtSiteCore
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```
3. Configure environment variables:
    - Скопируйте файл ".env.example" в файл ".env".
    - Обновите файл `.env` с вашими учетными данными для базы данных и секретными ключами. Пример:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=awt_database
   JWT_SECRET=your_jwt_secret
   ```

## Команды

- `npm run dev` — Запуск фронтенд-сервера для разработки (Vite).
- `npm run build` — Сборка фронтенда.
- `npm run server_dev` — Запуск сервера разработки (Node.js через nodemon).
- `npm run server_start` — Запуск сервера в рабочем режиме.
- `npm run bd_manage` — Утилита для управления базой данных.

## Предустановки
- Node.js (v22 или выше)
- MySQL (v8 или выше)

## Стек технологий

- **Серверная часть**: Express.js
- **Клиентская часть**: Vue 3, Pinia, Vue Router
- **База данных**: MySQL (с использованием mysql2)
- **Прочее**: bcrypt, jsonwebtoken, multer для обработки файлов

## Файловая структура

```
awtSiteCore/
├── bin/                 # Точки входа для серверного приложения
├── db/                  # Скрипты для управления базой данных
├── helpers              
   ├── api/              # Список API endpoint
   └── controllers/      # Контроллеры для обработки API запросов
├── public/              # Статические файлы
├── frontend/            # Исходный код фронтенда (административная часть приложения)
├── middleware/auth.js   # Реализует middleware для проверки аутентификации пользователя на основе JWT (JSON Web Token)
├── .env                 # Конфигурация среды
└── README.md            # Проектная документация
```

## Настройка и запуск

1. Создайте структуру базы данных, выполнив:
   ```bash
   npm run bd_manage
   ```

2. Запустите сервер разработки:
   ```bash
   npm run server_dev
   ```

3. Запустите фронтенд для разработки:
   ```bash
   npm run dev
   ```

## Участие в разработке

Если вы хотите внести вклад в проект:

1. Сделайте форк репозитория.
2. Создайте новую ветку для своих изменений.
3. Отправьте Pull Request с описанием изменений.

## Лицензия

Этот проект распространяется под лицензией MIT. Подробнее см. в файле [LICENSE](https://github.com/AstraWebTech/awtSiteCore/blob/main/LICENSE).
