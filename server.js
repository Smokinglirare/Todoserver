const http = require("http");
const fs = require("fs");


port = 5000;


const max = 10000000;


    let todoPost = { 
    id: Math.floor(Math.random() * max),
    todo: 'Diskdfsdfsda',
   
};

const app = http.createServer((req, res) => {

    const items = req.url.split("/") 
 //   console.log(items);
   // console.log(items[2]);
    

    if (req.method === "GET" && items[1] === "todos" && items.length === 2) {   
         fs.readFile("todos.json", (err, data) => {
            if (err) throw err;
            let todos = JSON.parse(data);
            res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(todos));
        });
        
        
     }  else if (req.method === "GET" && items.length === 3){
        fs.readFile("todos.json", (err, data) => {
            if (err) throw err;
            let todos = JSON.parse(data);
            res.statusCode = 200;
            todoIndex = parseInt(items[2]);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(todos[todoIndex]));
        

     })  
    } else if (req.method === "POST"){
        
     
        fs.readFile('todos.json', function (err, data) {
            let json = JSON.parse(data);
            console.log(json);
            json.push(todoPost);    
            let todoPost2 = JSON.stringify(json);
            fs.writeFile("todos.json", todoPost2, function(err){
              if (err) throw err;
              console.log('data skriven');
            });
        }) 
        res.statusCode = 201;
        res.end();
    
      
    } else if (req.method === "DELETE" ) {
       res.statusCode = 204;
       req.on("data", (chunk) => {
           const data = JSON.parse(chunk);
           console.log(data, "test id")
       })
       
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