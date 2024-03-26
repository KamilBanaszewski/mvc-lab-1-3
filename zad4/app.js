const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware do parsowania danych i logowania informacji o żądaniach
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const date = new Date().toLocaleString();
    console.log(`Request ${req.method} on path ${req.url} ${date}`);
    next();
});

app.use(express.static('public'));

let students = [];

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    const { firstName, lastName, major } = req.body;
    students.push({ firstName, lastName, major });
    res.status(201).send('Student został zaakceptowany');
});

app.delete('/students/:id', (req, res) => {
    const id = req.params.id;
    const index = students.findIndex(student => student.id === id);
    if (index !== -1) {
        students.splice(index, 1);
        res.send(`Student z ID ${id} został usunięty`);
    } else {
        res.status(404).send('Nie znaleziono studenta');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/student', (req, res) => {
    res.sendFile(__dirname + '/views/student.html');
});

app.post('/student', (req, res) => {
    res.redirect('/student');
});

app.get('/add_student', (req, res) => {
    res.sendFile(__dirname + '/views/add_student.html');
});

app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/views/users.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
