const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

const createSqlDump = (dumpDir, dumpName) => {
    const sqlDumpPath = path.join(dumpDir, dumpName + '.sql');
    const dumpCommand = `mysqldump -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > ${sqlDumpPath}`;
    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) console.error('Error creating SQL dump:', error.message);
        else console.log(`SQL dump completed: ${dumpDir}/${dumpName}.sql`);
    });
};

module.exports = { createSqlDump };
