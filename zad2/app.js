const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let students = [];

app.get('/', (req, res) => {
    res.send('<title>HOME</title><body><p>HOME</p>');
});

app.get('/student', (req, res) => {
    res.send('<title>STUDENT</title><body><form action="/student" method="post"><input type="text" name="firstName" placeholder="Imię"><br><input type="text" name="lastName" placeholder="Nazwisko"><br><input type="text" name="major" placeholder="Kierunek"><br><button type="submit">Dodaj studenta</button></form>');
});

app.post('/student', (req, res) => {
    const { firstName, lastName, major } = req.body;
    students.push({ firstName, lastName, major });
    app.post('/student', (req, res) => {
        const { firstName, lastName, major } = req.body;
        students.push({ firstName, lastName, major });
    
        const confirmationMessage = `
            <title>STUDENT ADDED</title>
            <body>
                <h1>Student Added Successfully!</h1>
                <p>Imię: ${firstName}</p>
                <p>Nazwisko: ${lastName}</p>
                <p>Kierunek: ${major}</p>
                <a href="/student">Dodaj kolejnego studenta</a>
            </body>
        `;

        res.send(confirmationMessage);
    });
    
});

app.get('/add-student', (req, res) => {
    res.send('<title>ADD-STUDENT</title><body><form action="/student" method="post"><input type="text" name="firstName" placeholder="Imię"><br><input type="text" name="lastName" placeholder="Nazwisko"><br><input type="text" name="major" placeholder="Kierunek"><br><button type="submit">Dodaj studenta</button></form>');
});

app.get('/users', (req, res) => {
    let userList = '<ul>';
    students.forEach(student => {
        userList += `<p>${student.firstName} ${student.lastName} - ${student.major}</p>`;
    });
    userList += '</ul>';
    res.send(userList);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
