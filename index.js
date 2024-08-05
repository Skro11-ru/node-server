const express = require('express');
const path = require('path');
const notesRouter = require('./routes/notes');

const app = express();
app.use(express.json()); // Парсинг JSON
app.use(express.urlencoded({ extended: true })); // Парсинг URL-encoded данных
app.use(express.static(path.join(__dirname, 'public')));
app.use('/notes', notesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
