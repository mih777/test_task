const cluster = require('cluster')
const os = require('os')
const pid = process.pid;
const port = process.env.PORT || 3000

if(cluster.isMaster) {

    console.log(`Master started Pid: ${pid} on port: ${port}`)
    for(let i = 0; i < os.cpus().length; i++){
        const worker = cluster.fork()
        
        worker.on('exit', () => {
            console.log(`worker died! Pid: ${worker.process.pid}`)

            // возрождаем убитый процесс
            cluster.fork()
        })
    }
    
}

if(cluster.isWorker){
    // подключаем воркер
    require('./worker')
}