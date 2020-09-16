const fs = require('fs')
const express = require("express");
const cors = require('cors')
const pid = process.pid;
const port = process.env.PORT || 3000
let switch_cpu
  
const app = express();

// Access to fetch at 'http://localhost:3000/
app.use(cors())
// создаем парсер для данных в формате json
const jsonParser = express.json();
// принимаем данные
app.post("/", jsonParser, function (req, res) {
     
    let result = req.body
    console.log(result)

    if(result > 100){switch_cpu = true}else{switch_cpu = false}
    console.log(switch_cpu)
    let log_str = `Отправлено обьектов: ${result.length}\n`

    fs.appendFileSync("log.txt", log_str);

    fs.writeFileSync("objects.json", JSON.stringify(result));
    
    res.json({ message: 'object created !', result })

});
 

app.listen(port, () => {
    console.log(`Server started. Pid: ${pid} on port: ${port}`);
});


module.exports = switch_cpu