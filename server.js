// app.js

const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3001;
const routes = require('./src/events/addEvents');
var cors = require('cors');

app.options('*', cors()) ;
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());
// Create an instance of the http server to handle HTTP requests
app.get('/', (req, res) => {
    res.send('Hello World, from express');
});


app.use('/events', routes);
// Start the server on port 3001
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
console.log('Node server running on port 3001');