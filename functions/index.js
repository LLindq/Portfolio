//index.js

const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllTodos
} = require('./APIs/todos')

const {
    // ..,
    postOneTodo
} = require('./APIs/todos')

const {
    // ..,
    deleteTodo
} = require('./APIs/todos')

const {
    // ..,
    editTodo
} = require('./APIs/todos')

const {
    loginUser
} = require('./APIs/users')

const {
    // ..,
    signUpUser
} = require('./APIs/users')

app.post('/signup', signUpUser);

// Users
app.post('/login', loginUser);

app.put('/todo/:todoId', editTodo);
app.delete('/todo/:todoId', deleteTodo);
app.post('/todo', postOneTodo);
app.get('/todos', getAllTodos);
exports.api = functions.https.onRequest(app);