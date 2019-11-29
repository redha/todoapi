// we don't care what db is. we focus on Business logic only

const 
db = require ('../db/');
const taskEntity = require('../entities/task');  // to validiate a task data
const sanitizer = require ('../helpers/sanitizer');

const taskController = {
    getTasks: async function(pageNumber = 1, pagesize = 10, filter = null, sort = [{'creatondate': -1}]){
        console.log("Task controller");
        return await db.getTasks(pageNumber, pagesize, filter, sort);
    },
    getOneTaskById: async function (id){
        console.log(`**** Task Controller - Return one task`);
        // check if the id is valid
        if (!/[0-9]+/.test(id)){
            return {error: `(${id}) is NOT a valid Id.`}
        }
            
        try{
            return await db.getOneTaskById(id);
        }
        catch(e){
            console.trace(e);
            return {rows: [], error: 'Unknown Error: Could not get task data from db'};
        }
    },
    deleteOneTaskById: async function (id){
        console.log('****** Task Controller - Delete a Task ****');
        if(!sanitizer.isInteger(id)){
            return {error: `(${id}) is NOT an integer !`};
        }
        if (/\D/g.test(id)){
            return {error: `(${id}) is NOT a valid Id`};
        }

        return db.deleteOneTaskById(id);
    },
    addTask: async function (object){  
        object.createdOn = new Date().toISOString();
        let newTask = object;
        try{
            newTask = taskEntity.getCompleteValidTask(object);
        }
        catch(e)
        {
            return {error: e.message};
        }

        //return {rows: [newTask], error: null};
        return db.addTask(newTask);
    },
    updateTask: async function (id, newTask){
        if (!/[0-9]+/.test(id)){
            return {error: `(${id}) is NOT a valid Id.`}
        }

        console.log('Task Controller - Updating a task');
        throw new Error('not implemented');
    },
};

module.exports = taskController;