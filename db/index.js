require('dotenv').config();
const mysql = require('mysql2/promise');

// Создание пула соединений с использованием промисов
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ...(process.env.DB_PORT && { port: process.env.DB_PORT }),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Проверка подключения при запуске
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database.');
        connection.release(); // Освобождение соединения обратно в пул
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
})();

module.exports = pool;
