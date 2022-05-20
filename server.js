const http = require("http");
const fs = require("fs");



port = 5000;


const max = 10000000;

/*
    let todoPost = { 
    id: Math.floor(Math.random() * max),
    todo: 'Diskdfsdfsda',
   
}; */
let todos = [];

fs.readFile("todos.json", (err, data) => {
    if (err) throw err;
    todos = JSON.parse(data);
})
        
const app = http.createServer((req, res) => {

    const items = req.url.split("/")
    //   console.log(items);
    //console.log(items[2]);
    //console.log(items[1]);


    if (req.method === "GET" && items[1] === "todos" && items.length === 2) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(todos));
        


    } else if (req.method === "GET" && items.length === 3) {
            res.statusCode = 200;
            todoIndex = parseInt(items[2]);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(todos[todoIndex]));


        
    } else if (req.method === "POST") {
            let todoPost = {
                id: Math.floor(Math.random() * max),
                todo: 'Diskdfsdfsda',

            };
            todos.push(todoPost);
            let todoPost2 = JSON.stringify(todos);
            fs.writeFile("todos.json", todoPost2, function (err) {
                if (err) throw err;
                console.log('data skriven');
            });
        res.statusCode = 201;
        res.end();


    } else if (req.method === "DELETE" && items[1] === "todos" && items.length === 3) {
            const todoID = parseInt(items[2]);
            todos = todos.filter(todo => parseInt(todo.id) !== todoID);
            fs.writeFile("todos.json", JSON.stringify(todos), (err,) => {
                if (err) throw err;
                res.statusCode = 200;
                res.end();
            });

        
    }
    else if (req.method === "PUT" && items[1] === "todos" && items.length === 3) {
        // PUT ersätter hela objektet
            const todoID = parseInt(items[2]);
            req.on("data", (chunk) => {
                data = JSON.parse(chunk);
                todos = todos.map(todo => { if (todo.id === todoID) { todo.todo = data.todo } });
              })
            

            fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
                if (err) throw err;
                res.statusCode = 200;
                res.end();
            });
        
    }

    else {
        res.statusCode = 404;
        res.end();
    }
})

app.listen(port, () => {
    console.log(`Nu körs servern på port ${port}`)
})

/*
res.setHeader("Access-Control-Allow-Origin", "*");

res.setHeader("Content-Type", "application/json");

res.setHeader("Access-Control-Allow-Credentials", "true");

res.setHeader(

"Access-Control-Allow-Methods",

"GET, PATCH, DELETE, OPTIONS, POST, PUT"

);



if (req.method === "OPTIONS") {

res.statusCode = 200;

res.end();

} */