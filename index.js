const express = require('express');

// Define App object
const app = express();

// Check Config File
require('./startup/checkConfig')();

// Add Global Middleware
require('./startup/addMiddleware')(app);

// Add Routes
require('./startup/addRoutes')(app);

// Revise Server
const port = process.env.PORT || 3000;

// Launching Server
app.listen(port,()=>{
    console.log(`Server Running on port ${port}\nhttp://127.0.0.1:${port}`);
});
