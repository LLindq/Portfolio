const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo,
    getOneTodo
} = require('./APIs/todos')

const {
    getAllBlogs,
    postOneBlog,
    deleteBlog,
    editBlog,
    getOneBlog
} = require('./APIs/blogs')

const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails,
} = require('./APIs/users')

app.post('../components/dashboard')
app.post('/user', auth, updateUserDetails);
app.get('/user', auth, getUserDetail);

app.post('/user/image', auth, uploadProfilePhoto);
app.post('/signup', signUpUser);
app.post('/login', loginUser);

app.put('/blog/:blogId', auth, editBlog);
app.delete('/blog/:blogId', auth, deleteBlog);
app.post('/blog', auth, postOneBlog);
app.get('/blogs', getAllBlogs);
app.get('/blog/:blogId', auth, getOneBlog);

app.put('/todo/:todoId', auth, editTodo);
app.delete('/todo/:todoId', auth, deleteTodo);
app.post('/todo', auth, postOneTodo);
app.get('/todos', auth, getAllTodos);
app.get('/todo/:todoId', auth, getOneTodo);
exports.api = functions.https.onRequest(app);