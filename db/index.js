const { Pool } = require ('pg');
sanitizer = require ('../helpers/sanitizer')

const pool = new Pool();

dbLibrary = {
    getTasks: async function(pageNumber = 1, pagesize = 25, filter = null, sort = null) {

        console.log(`getTasks (${pageNumber}, ${pagesize}, ${filter}, ${sort})`);
        const getTasksQuery = {
            text: `select id, description, duedate, creationdate, done, priority from tasks order by creationdate desc offset $1 limit $2`,
            values: [pagesize*(pageNumber - 1), pagesize]
        };

        console.log(getTasksQuery);

        let results = {
            rows: [], 
            error: null
        };
        let client = null;
        try{
            client = await pool.connect();
            let r = await client.query(getTasksQuery);
            results.rows = r.rows;
            console.table(results.rows);
        }
        catch(e){
            results.error = 'A DB Error Hapened';
        }
        finally {
            client.release();
            return results;
        }
    },
    getOneTaskById: async function(id){
        console.log(`getOneTaskById (${id})`);
        const getTaskQuery = {
            text: `select id, description, duedate, done, priority, creationdate from tasks where id = $1 limit 1`,
            values: [id]
        };
        let results = {
            rows: [], 
            error: null
        };

        let client = null;
        try{
            client = await pool.connect();
            let r = await client.query(getTaskQuery);
            results.rows = r.rows;
            console.table(results.rows);
        }
        catch(e){
            console.log(e);
            console.log('**************************************');
            console.log(`A DB Error Hapened - Can't get task`);
            
            
            results.error = `A DB Error Hapened - Can't get task`;
        }
        finally {
            client.release();
            return results;
        }
    },
    deleteOneTaskById: async function (id){
        console.log(`deleteOneTaskById (${id})`);
        const deleteQuery = {
            text: `delete from tasks where id = $1 returning id, description`,
            values: [id]
        };
        let results = {
            rows: [], 
            error: null
        };
        let client = null;

        try{
            client = await pool.connect();
            let r = await client.query(deleteQuery);
            results.rows = r.rows;
            console.table(results.rows);
        }
        catch(e){
                console.log(e);
            results.error = `A DB Error Hapened - Can't delete task`;
        }
        finally {
            client.release();
            return results;
        }   
    },
    addTask: async function ({description, dueDate, createdOn, modifiedOn, done, priority} = newTask){

        //const {description, dueDate, creationdate, modifiedon, done, priority} = newTask = newTask;
        console.log(`DB - addTask (${description}, ${dueDate}, ${createdOn}, ${modifiedOn}, ${done}, ${priority})`);
        const addQuery = {
            text: `insert into tasks (description, duedate, creationdate, modifiedon, done, priority) values ($1, $2, $3, $4, $5, $6) returning id, description`,
            values: [description, dueDate, createdOn, modifiedOn, done, priority]
        };

        let results = {
            rows: [], 
            error: null
        };
        let client = null;

        try{
            client = await pool.connect();
            let r = await client.query(addQuery);
            results.rows = r.rows;
            console.table(results.rows);
        }
        catch(e){
            console.log(e);
            results.error = `A DB Error Hapened - Can't add task`;
        }
        finally {
            client.release();
            return results;
        }
    }
}

module.exports = dbLibrary;