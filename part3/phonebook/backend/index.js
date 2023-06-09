const express = require('express');
var morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

morgan.token('body', function (req, res, param) {
  // console.log(Object.keys(res));
  // console.log(JSON.stringify(req.body));
  // let reqBody = JSON.stringify(req.body);
  let reqBody = JSON.stringify(req.body);
  return reqBody;
});

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456',
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523',
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-43-234345',
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-6423122',
//   },
// ];'

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) => {
  // response.json(persons);
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/info', (request, response) => {
  let today = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${today}</p>`
  );
});

app.get('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  // const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return Math.floor(Math.random() * 100);
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  // const matchedPerson = null;
  // Person.findById(request.params.id).then((person) => {
  //   matchedPerson = person;
  //   response.json(person);
  // });
  // let personIndex = persons.findIndex((person) => person.name === body.name);

  if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number is missing',
    });
  }
  // if (personIndex >= 0) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   });
  // }
  // if (matchedPerson) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  // persons = persons.concat(person);

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });

  // response.json(person);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
