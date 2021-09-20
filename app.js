const express = require('express');
const path = require('path');
const indexAction = require('./actions/index')
const uploadAction = require('./actions/upload')

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', indexAction);
app.post('/upload', uploadAction);

const port = 3000;
app.listen(port, () => {
    console.log(`Image auto-tagging server running at localhost:${port}`);
});
