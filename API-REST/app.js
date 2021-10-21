//imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


// Middleware
app.use(
    express.urlencoded({
        extended : true
    })
);
app.use(express.json());

// routes
const userRoute = require('./routes/UserRoute');
const templateRoute = require('./routes/TemplateRoute');
const formRoute = require('./routes/FormR');
const approvalRoute = require('./routes/ApprovalRoute');

app.use('/users', userRoute);
app.use('/template', templateRoute);
app.use('/form', formRoute);
app.use('/formRoute', approvalRoute);


mongoose.connect(process.env.DB_CONNECTION,
    {useUnifiedTopology: true, useNewUrlParser: true},
    () => {console.log('Connected to DB!!!')
    });

// Server listening in port 3000
app.listen(3000);