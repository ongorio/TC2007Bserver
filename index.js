const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// DB Start
require('./startup/db')();


// Middleware
app.use(cors()) // Allowed cors Without restriction
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res)=>{
    res.send('Prepanet :)')
});


// Launching Server
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server Running on port ${port}\nhttp://127.0.0.1:${port}`);
});
