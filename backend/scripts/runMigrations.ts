// runMigrations.ts
import fs from 'fs';
import path from 'path';
import pool from '../src/config/data-source';

const runMigrations = async () => {
    const client = await pool.connect();
    try {
        const migrationsDir = path.join(__dirname, '..', 'migrations');
        const files = fs.readdirSync(migrationsDir);

        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, 'utf-8');
            await client.query(sql);
            console.log(`Migration ${file} executed successfully`);
        }
    } catch (err) {
        console.error('Error running migrations', err);
    } finally {
        client.release();
    }
};

runMigrations().catch(err => console.error('Error initializing database', err));