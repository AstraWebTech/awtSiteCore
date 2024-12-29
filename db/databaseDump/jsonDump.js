const fs = require('fs');
const path = require('path');
const pool = require('./index');

const createJsonDump = async (dumpDir, dumpName) => {
    const connection = await pool.getConnection();
    const [tables] = await connection.query('SHOW TABLES');
    const tableNames = tables.map((table) => Object.values(table)[0]);
    const jsonDump = {};
    for (const tableName of tableNames) {
        const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
        jsonDump[tableName] = rows;
    }
    const jsonDumpPath = path.join(dumpDir, dumpName + '.json');
    fs.writeFileSync(jsonDumpPath, JSON.stringify(jsonDump, null, 2));
    console.log(`JSON dump completed: ${dumpDir}/${dumpName}.json`);
    connection.release();
};

module.exports = { createJsonDump };
