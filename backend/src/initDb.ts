import pool from './config/data-source';

const createTables = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS duties (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(1) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Tables created successfully');
    } catch (err) {
        console.error('Error creating tables', err);
    } finally {
        client.release();
    }
};

createTables().catch(err => console.error('Error initializing database', err));