const http = require("http");
const fs = require("fs");


port = 5000;



const app = http.createServer((req, res) => {

    if (req.method === "GET") { 

        
      
      
      
      
         fs.readFile('todos.json', (err, data) => {
            if (err) throw err;
            let todos = JSON.parse(data);
            res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(todos));
        });
        
      }

})

app.listen(port, () => {
    console.log(`Nu körs servern på port ${port}`)
})