const fs = require('fs');
const path = require('path');
const { createSqlDump } = require('./sqlDump');
const { createJsonDump } = require('./jsonDump');
const { createPhpDump } = require('./phpDump');

// Директория всех дампов базы данных
const dumpDir = 'bd_dumps';

/**
 * Создание дампа базы данных
 * @description может преобразовать развёрнутую sql bd в [.sql, .json, .php] дамп
 * @param dumpFormat
 */
const dumpDatabase = async (dumpFormat) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const dumpName = `dump_${currentDate}`;

    try {
        if (!fs.existsSync(dumpDir)) {
            fs.mkdirSync(dumpDir);
            console.log(`Directory '${dumpDir}' created.`);
        }
        if (dumpFormat === 'sql' || dumpFormat === 'all') createSqlDump(dumpDir, dumpName);
        if (dumpFormat === 'json' || dumpFormat === 'all') await createJsonDump(dumpDir, dumpName);
        if (dumpFormat === 'php' || dumpFormat === 'all') await createPhpDump(dumpDir, dumpName);
        console.log('Dump process finished!');
    } catch (error) {
        console.error('Error during dump process:', error.message);
    }
};

/**
 * Удаление всех дампов базы данных
 */
const deleteDumps = () => {
    if (fs.existsSync(dumpDir)) {
        fs.rmdir(dumpDir, err => {
            if (err) throw err;
            console.log(`${dumpDir} is deleted!`);
        });
    } else {
        console.log('No dumps found to delete.');
    }
};

/**
 * Создание базы из дампа
 * @param dumpFile
 */
const restoreDatabaseFromDump = (dumpFile) => {
    const dumpPath = path.join(__dirname, 'bd_dumps', dumpFile);
    if (fs.existsSync(dumpPath)) {
        const restoreCommand = `mysql -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} < ${dumpPath}`;
        console.log(`Restoring database from dump: ${dumpFile}`);
        exec(restoreCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('Error restoring database from dump:', error.message);
                return;
            }
            if (stderr) {
                console.error('Restore stderr:', stderr);
                return;
            }
            console.log('Database restored successfully!');
        });
    } else {
        console.log(`Dump file ${dumpFile} not found.`);
    }
};

module.exports = { dumpDatabase, deleteDumps, restoreDatabaseFromDump };
