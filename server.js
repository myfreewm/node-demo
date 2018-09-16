

var net = require('net');

var servers = net.createServer((socket)=>{

    socket.on('data',(data)=>{

        socket.write(data);

    })

})

servers.listen(8888);
