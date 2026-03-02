import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(express.json());
app.use(cors());

// תיקון 1: שימוש בשם ה-Service של ה-DB ב-Kubernetes (postgres-service)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres-service:5432/translations'
});

// פונקציית תרגום אמיתית דרך LibreTranslate API
async function translateText(text, target) {
  // תיקון 2: שימוש במשתנה סביבה לכתובת המתרגם או בשם ה-Service (translator-service)
  const translatorHost = process.env.TRANSLATOR_HOST || 'translator-service';
  
  try {
    const res = await fetch('http://translator-service:5000/translate', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        q: text,        // LibreTranslate דורש q ולא text
        source: "en",
        target: "he",
        format: "text"
    })
});
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    return data.translatedText;
  } catch (err) {
    console.error('Translation error:', err);
    return '(שגיאה בתרגום)';
  }
}

app.post('/translate', async (req, res) => {
  const { text, target } = req.body;
  if (!text || !target) return res.status(400).json({ error: 'Missing text or target' });

  try {
    const translatedText = await translateText(text, target);
    await pool.query('INSERT INTO translations (source_text, target_lang, translated_text) VALUES ($1,$2,$3)', 
      [text, target, translatedText]);
    res.json({ translatedText });
  } catch (dbErr) {
    console.error('Database error:', dbErr);
    res.status(500).json({ error: 'Database saving failed' });
  }
});

app.get('/history', async (req, res) => {
  try {
    const r = await pool.query('SELECT source_text, translated_text FROM translations ORDER BY id DESC LIMIT 10');
    res.json(r.rows);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// בדיקת בריאות (Health Check) - חשוב ל-Kubernetes Probes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(3001, '0.0.0.0', () => console.log('✅ Backend running on port 3001'));