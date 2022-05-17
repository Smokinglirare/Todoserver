const http = require("http");

port = 5000;

const app = http.createServer((req, res) => {

})

app.listen(port, () => {
    console.log(`Nu körs servern på port ${port}`)
})