const tasksRoute = require('express').Router();

const httpHelper = require('../helpers/http');
const tasksController = require('../controllers/tasks');
const {processError} = require('./errors');

tasksRoute.get('/:id', async (req, res) => {
    try{
        console.log('* Tasks Router - GetOneTaskById !!');
        
        let { rows, error } = await tasksController.getOneTaskById(req.params.id);
        
        if (error){
            res.status(403).send({'error': error});
        }
        else{
            if(!rows[0]){ // not found task
                res.status(404).send(rows);
            }
            else{
                console.log(rows);
                res.status(200).send(rows);
            }
        }
    }
    catch(e){
        processError(e, res);
    }
});

tasksRoute.post('/new', async (req, res) => {
    try{
        console.log(`0: CREATING New Task...`);
        let httpRequest = httpHelper.httpRequest(req);

        let {rows, error } = await tasksController.addTask(httpRequest.body);
        
        if (error){
            res.status(400).send({rows, error });
        }
        else{
            console.log(rows);
            res.status(200).send(rows);
        }    }
    catch(e){
        processError(e, res);
    }
});

tasksRoute.put('/:id', async (req, res) => {
    try{
        console.log(`UPDATING Task #${req.params.id}, req.body.task`);
        const { rows, error } = await tasksController.updateTask(req.params.id, req.body);
        if(error){
            res.status(400);
        }
        else {
            if (rows.length == 0){
                res.status(404);
            }
            else{
                res.status(200);
            }
        }
        res.send({ rows, error});
    }
    catch(e){
        processError(e, res);
    }

});

tasksRoute.delete('/:id', async (req, res) => {
    try{
        console.log(`DELETING Task #${req.params['id']}`);
        let {rows, error } = await tasksController.deleteOneTaskById(req.params.id);
            
        if (error){
            res.status(400).send({rows, error });
        }
        else{
            if (rows.length == 0){
                res.status(404).send({deleted: rows});
            }
            else{
                console.log(rows);
                res.status(200).send({deleted: rows});
            }
        }
    }
    catch(e){
        processError(e, res);
    }
});

tasksRoute.get('/', async (req, res) => {
    try{
        console.log(`GET Tasks list`);
        let {rows, error } = await tasksController.getTasks();
    
        if (error){
            res.status(500).send('error' + results.error);
        }
        else{
            console.log(rows);
            res.status(200).send({tasks: rows});
        }
    }
    catch(e){
        processError(e, res);
    }
});

module.exports = tasksRoute;