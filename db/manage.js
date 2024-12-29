const { prompt } = require('enquirer');
const { dumpDatabase, deleteDumps, restoreDatabaseFromDump } = require('./databaseDump');
const {setupDatabase} = require("./setupDatabase");

// Главное меню
const main = async () => {
    const response = await prompt({
        type: 'select',
        name: 'action',
        message: 'Choose an action:',
        choices: [
            'Create database dump',
            'Delete all dumps',
            'Restore database from dump',
            'Setup database structure',
            'Exit'
        ]
    });

    switch (response.action) {
        case 'Create database dump':
            const { dumpFormat } = await prompt({
                type: 'select',
                name: 'dumpFormat',
                message: 'Choose dump format:',
                choices: ['sql', 'json', 'php']
            });
            await dumpDatabase(dumpFormat);
            break;
        case 'Delete all dumps':
            deleteDumps();
            break;
        case 'Restore database from dump':
            const dumpFile = await prompt({
                type: 'input',
                name: 'file',
                message: 'Enter the name of the dump file (e.g. dump_2024-12-30.sql):'
            });
            restoreDatabaseFromDump(dumpFile.file);
            break;
        case 'Setup database structure':
            await setupDatabase();
            break;
        case 'Exit':
            console.log('Exiting...');
            break;
        default:
            console.log('Invalid option');
            break;
    }
};

main();
