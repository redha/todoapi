// if no port /  postgres env variable initialized => initialize them
// you can initialize some or all the env variable via command line: 
// "PORT=1234 PGHOSTADDR=192.168.1.100 node index.js"

if (!process.env.PORT) process.env.PORT = 3000;
if (!process.env.PGHOSTADDR) process.env.PGHOSTADDR = '127.0.0.1'
if (!process.env.PGPORT) process.env.PGPORT = '5432'
if (!process.env.PGDATABASE) process.env.PGDATABASE = 'tasks'
if (!process.env.PGUSER) process.env.PGUSER = 'postgres'
if (!process.env.PGPASSWORD) process.env.PGPASSWORD = 'myPassword_Here!'
