const fs = require('fs')
const express = require("express");
const cors = require('cors')
const pid = process.pid;
const port = process.env.PORT || 3000 
const app = express();

// Access to fetch at 'http://localhost:3000/
app.use(cors())
// создаем парсер для данных в формате json
const jsonParser = express.json();
// принимаем данные
app.post("/", jsonParser, function (req, res) {
     
    let result = req.body

    // вывод обьектов в консоль
    console.log(result)

    let log_str = `Отправлено обьектов: ${result.length}\n`

    // логирование
    fs.appendFileSync("log.txt", log_str);

    // запись обьектов в файл
    fs.writeFileSync("objects.json", JSON.stringify(result));
    
    // это не обязательно, если запустить в postman, будет вывод там
    res.json({ message: 'object created !', result })

});
 

// сервер запускаем
app.listen(port, () => {
    console.log(`Server started. Pid: ${pid} on port: ${port}`);
});