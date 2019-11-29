const authRouter = require('express').Router();
let appControllers = null;

authRouter.get('/register', (req, res) => {    
    console.log('GET registering new user....');
    
    res.status('400').send('\n\n>>>  Form Registering new user - not implemented');
})

authRouter.post('/register', (req, res) => {    
    console.log('POST registering new user....');
    
    res.status(400).send('\n\n>>>  Posting new user infos - not implemented');
})

authRouter.get('/login', (req, res) => {    
    console.log('GET Logging user....');
    
    res.status('400').send('\n\n>>>  Form Login New user - not implemented');
})

authRouter.post('/login', (req, res) => {    

    // let's assume that the user is logged in 
    if (true == false)
        tasksControllers = require('../controllers/tasks');

    console.log('POST Logging user....');
    res.status(400).send('\n\n>>>  Posting login infos - not implemented');
})

authRouter.get('/logout', (req, res) => {    

    //delete any auth object related, I think not every thing can be done on the client, but we should delete or mark the current session as disconnected so the api should not process any closed session related token requests
    appControllers = null;

    console.log('GET Logging OUT user....');
    res.status('400').send('\n\n>>>  Form Login user OUT - not implemented');
})


module.exports = authRouter;