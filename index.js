const express = require('express');
const bodyParser = require('body-parser');

let app = express();

// body-parser

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


try{
    require ('./config/development');
}
catch(e)
{
    console.warn('*** Attention please: the file "./config/development" does not exist, proceeding with "./config/index.js"');
    console.log('*** Please make sure to enter your postgres connection infos there');
   
    require('./config/');
}

console.log(`**** Application PORT: ${process.env.PORT}`);
console.log(`**** Application PGHOSTADDR: ${process.env.PGHOSTADDR}`);
console.log(`**** Application PGPORT: ${process.env.PGPORT}`);
console.log(`**** Application PGUSER: ${process.env.PGUSER}`);
console.log(`**** Application PGPASSWORD: ${process.env.PGPASSWORD}`);

// Import Routes
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');

// Route Middlewares
app.use('/api/user', authRoute);

// TODO: use tasks route on user login, not before
app.use('/api/tasks', tasksRoute);

// If we have a static content to serve
app.use(express.static(__dirname + '/static'));

// all verbs fallout: 
app.all('*', (req, res) => {
    console.log(`${req.method} - ${req.url}`);
    res.status(404).send(`${req.url} not found`);
});

// Lunch the server
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App and running from ${port}.... ;)`)});