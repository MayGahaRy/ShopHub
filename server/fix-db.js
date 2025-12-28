const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPaths = [
    path.resolve(__dirname, '../database.sqlite'), // Project Root
    path.resolve(__dirname, 'database.sqlite')     // Server Folder
];

dbPaths.forEach(dbPath => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) return console.error('Could not connect to', dbPath, err.message);
        console.log('\nChecking database:', dbPath);

        db.serialize(() => {
            // Add columns to both singular and plural versions to be absolutely safe
            ['User', 'Users'].forEach(table => {
                db.run(`ALTER TABLE ${table} ADD COLUMN lastActive DATETIME`, (err) => {
                    if (err) {
                        if (!err.message.includes('duplicate column name') && !err.message.includes('no such table')) {
                            console.error(`Error adding to ${table}:`, err.message);
                        }
                    } else console.log(`Added "lastActive" to ${table}`);
                });
            });

            ['Message', 'Messages'].forEach(table => {
                db.run(`ALTER TABLE ${table} ADD COLUMN type TEXT DEFAULT 'text'`, (err) => {
                    if (err && !err.message.includes('duplicate') && !err.message.includes('no such table')) console.error(`Error adding type to ${table}:`, err.message);
                });
                db.run(`ALTER TABLE ${table} ADD COLUMN image LONGTEXT`, (err) => {
                    if (err && !err.message.includes('duplicate') && !err.message.includes('no such table')) console.error(`Error adding image to ${table}:`, err.message);
                });
            });
        });
    });
});

db.close();
