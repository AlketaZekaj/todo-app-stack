const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    done BOOLEAN DEFAULT false
  );
`);

app.get('/todos', async (req, res) => {
  console.log('[GET /todos]');
  try {
    const result = await pool.query('SELECT id, text FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error('[ERROR /todos GET]', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/todos', async (req, res) => {
  const { text } = req.body;
  console.log(`[POST /todos] Text received: "${text}"`);

  if (!text || text.length > 140) {
    console.log(`[REJECTED] Todo too long or invalid: "${text}"`);
    return res.status(400).json({ error: 'Todo text must be ≤ 140 characters' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO todos (text) VALUES ($1) RETURNING id, text',
      [text]
    );
    console.log(`[SAVED] Todo created: "${text}"`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('[ERROR /todos POST]', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

app.listen(5000, () => {
  console.log(' Todo backend listening on port 5000');
});
