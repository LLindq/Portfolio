//index.js

const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

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


const {
    // ..,
    uploadProfilePhoto
} = require('./APIs/users')


const {
    // ..,
    getUserDetail
} = require('./APIs/users')

const {
    // ..,
    updateUserDetails
} = require('./APIs/users')

const {

    getOneTodo
} = require('./APIs/todos')

app.post('/user', auth, updateUserDetails);
app.get('/user', auth, getUserDetail);
app.get('/todo/:todoId', auth, getOneTodo);
app.post('/user/image', auth, uploadProfilePhoto);
app.post('/signup', signUpUser);
app.post('/login', loginUser);
app.put('/todo/:todoId', auth, editTodo);
app.delete('/todo/:todoId', auth, deleteTodo);
app.post('/todo', auth, postOneTodo);
app.get('/todos', auth, getAllTodos);
exports.api = functions.https.onRequest(app);