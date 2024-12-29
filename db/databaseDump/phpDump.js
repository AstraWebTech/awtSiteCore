const fs = require('fs');
const path = require('path');
const pool = require('./index');

const createPhpDump = async (dumpDir, dumpName) => {
    const connection = await pool.getConnection();
    const [tables] = await connection.query('SHOW TABLES');
    const tableNames = tables.map((table) => Object.values(table)[0]);
    const phpDump = {};
    for (const tableName of tableNames) {
        const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
        phpDump[tableName] = rows;
    }
    const phpDumpPath = path.join(dumpDir, dumpName + '.php');
    const phpContent = `<?php\n\nreturn ${convertToPhpArray(phpDump)};\n`;
    fs.writeFileSync(phpDumpPath, phpContent);
    console.log(`PHP dump completed: ${dumpDir}/${dumpName}.php`);
    connection.release();
};

// Вспомогательная функция для преобразования объекта JSON в массив PHP
function convertToPhpArray(obj) {
    const array = Object.entries(obj)
        .map(([key, value]) => {
            const serializedValue = Array.isArray(value)
                ? value.map((row) => serializePhpObject(row)).join(',\n')
                : serializePhpObject(value);
            return `'${key}' => [\n${serializedValue}\n]`;
        })
        .join(',\n');
    return `[\n${array}\n]`;
}

function serializePhpObject(obj) {
    const entries = Object.entries(obj)
        .map(([key, value]) => {
            const formattedValue =
                typeof value === 'string'
                    ? `'${value.replace(/'/g, "\\'")}'`
                    : value === null
                        ? 'null'
                        : value;
            return `'${key}' => ${formattedValue}`;
        })
        .join(', ');
    return `[\n${entries}\n]`;
}

module.exports = { createPhpDump };
