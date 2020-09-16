const fs = require('fs')
const express = require("express");
const cors = require('cors')
const pid = process.pid;
  
const app = express();
app.use(cors())
// создаем парсер для данных в формате json
const jsonParser = express.json();
  
app.get("/", function(req, res){
      
    var content = fs.readFileSync("objects.json", "utf8");
    var objects = JSON.parse(content);
    res.send(objects);
});

// получение отправленных данных
app.post("/", jsonParser, function (req, res) {
     
    
    let result = req.body
    console.log(result.length)
    let log_str = `Отправлено обьектов: ${result.length}\n`

    fs.appendFileSync("log.txt", log_str);

    fs.writeFileSync("objects.json", JSON.stringify(result));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.json({
        message: 'object created !', result
    })

});


const port = process.env.PORT || 3000 

app.listen(port, () => {
    console.log(`Server started. Pid: ${pid} on port: ${port}`);
});