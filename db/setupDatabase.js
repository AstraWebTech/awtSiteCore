const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('./index');

const setupDatabase = async () => {
    try {
        // Читаем SQL-файл
        const sql = fs.readFileSync('./db/setup.sql', 'utf-8');
        // Разбиваем SQL-команды по точке с запятой
        const sqlStatements = sql.split(';').filter((stmt) => stmt.trim() !== '');
        // Выполняем команды из SQL-файла
        console.log('Setting up database structure...');
        for (const statement of sqlStatements) {
            try {
                await db.query(statement);
            } catch (err) {
                console.error(`Error executing statement: ${statement}`);
                throw err;
            }
        }
        console.log('Database structure created successfully.');
        // Добавляем пользователя-администратора
        console.log('Adding admin user...');
        const adminPassword = 'admin'; // Пароль администратора
        const hashedPassword = await bcrypt.hash(adminPassword, 10); // Хешируем пароль
        const insertAdminQuery = `
            INSERT INTO users (character_code, external_code, login, password, avatar_url)
            VALUES ('admin', 'admin', 'admin', ?, 'admin_avatar_url')
            ON DUPLICATE KEY UPDATE password = VALUES(password)
        `;

        await db.query(insertAdminQuery, [hashedPassword]);
        console.log('Admin user added successfully.');
    } catch (err) {
        console.error('Error setting up the database:', err);
    } finally {
        await db.end();
    }
};

module.exports = { setupDatabase };
