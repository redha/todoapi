# Tasks Manager API (with Auth not yet)
API to manage tasks. It includes : 
* Listing tasks (by default X last added tasks)
* Add a task: API return the new task's id
* Delete a task: API returns 200 with the deleted task's id
* Update Task - Not yet

# Todos & Issues
[X] Issue: When trying DELETE "http://localhost:3000/api/tasks/45';delete&20from&20users" we got an unhandled error (not an issue)
[X] Todo: When attempt to delete/get an inexistent task, respond by 'Not Found' or 400 Bad Request
[X] Todo: Validate task data before submitting to db
[X] Todo: id paramater check if it's in a valid format (integer) - let's do it in the router
[X] Error: If a user posts new task with '2019-12-03 99:09:000' as a due date, the system won't respond with 400 but 200 instead and add a new task. It should !
[X] Todo: If user enter an invalid dueDate he'll get 'Unhandled Error' => get a clear message instead

___Always focus on the top 1 or 2 ___

[ ] Todo: Update a task
[ ] Todo: Wrap httpRequest and httpResponse
[ ] Todo: paging when getting tasks list request and response parts
[ ] Todo: Unify controller methods call from router
[ ] Todo: 'Help topics' Router and when needed respond with a link to this help topics
[ ] Question; Why the heck on earth ToDate('2019-01-29T10:00:00.000Z') does not return 'Invalid Date' !!!
[ ] Todo: Weird response when submitting '88%' as a task 'id'
[ ] Issue: User shouldn't be able to add a task twice
[ ] Todo: Manage paging
[ ] Todo: Manage filtering: {fieldName: 'description', operator: 'contains', value: ''} => SQL String
[ ] Todo: Manage Sorting
[ ] Question: Should we keep try catch in db and controllers ?
[ ] ToDo: One date format input and outpu.
[ ] If no db => Create it
[ ] Log errors
