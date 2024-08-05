const express = require('express');
const router = express.Router();
const pool = require('../db');

// Создание новой заметки
router.post('/', async (req, res) => {
	const { text } = req.body;
	try {
		const newNote = await pool.query(
			'INSERT INTO notes (text, created_at) VALUES ($1, NOW()) RETURNING *',
			[text]
		);
		res.json(newNote.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Получение списка всех заметок
router.get('/', async (req, res) => {
	try {
		const allNotes = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
		res.json(allNotes.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Получение конкретной заметки по ID
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const note = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
		res.json(note.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
