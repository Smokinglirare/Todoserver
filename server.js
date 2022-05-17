const http = require("http");
const fs = require("fs");


port = 5000;

    let todoPost = { 
    todo: 'Diskdfsdfsda',
   
};

const app = http.createServer((req, res) => {

    const items = req.url.split("/") 

    if (req.method === "GET" && items[1] === "todos") {   
         fs.readFile("todos.json", (err, data) => {
            if (err) throw err;
            let todos = JSON.parse(data);
            res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(todos));
        });
        
     }   else if (req.method === "POST"){
        
        fs.readFile("todos.json", (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            
            fs.writeFile("todos.json", JSON.stringify(todoPost, null, 2), (err) => {
              if (err) {
                console.log('Failed to write updated data to file');
                return;
              }
              console.log('Updated file successfully');
            });
          });


      /*  fs.readFile('todos.json', function (err, data) {
            let json = JSON.parse(data);
            json.push(todoPost);    
            let todoPost2 = JSON.stringify(todoPost);
            fs.writeFile("todos.json", todoPost2, function(err){
              if (err) throw err;
              console.log('The "data to append" was appended to file!');
            });
        }) */


      /*  let json = JSON.stringify(todoPost, null, 2);

        fs.appendFile('todos.json', json, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        }); */
        res.statusCode = 201;
        res.end();
    } else if (req.method === "DELETE") {
        fs.unlink("todos.json",function(err, data) {
            if (err) throw err;
            console.log(data);
        }); 
          console.log("\nFile Deleted!\n");
        
        res.statusCode = 204;
        res.end();
      
    }
      else {
        res.statusCode = 404;
        res.end();
    }

})

app.listen(port, () => {
    console.log(`Nu körs servern på port ${port}`)
})