var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();

channel.clients = {};
channel.subscription = {};

channel.on('join',function(id, client){

    this.clients[id] = client;
    this.subscription[id] = function(senderid,message){

        if(id != senderid){

            this.clients[id].write(message);

        }

    }
    this.on('broadcast',this.subscription[id]);

});

channel.on('leave',function(id){

    channel.removeListener('broadcast',this.subscription[id]);

    channel.emit('broadcast',id,id+'has left the chat. \n');
})

channel.on('shutdown',function(){

    channel.emit('broadcast','','chat has shutdown');
    channel.removeAllListeners('broadcast');
})
var server = net.createServer(function(client){

    var id = client.remoteAddress + ':' + client.remotePort;

    channel.emit('join',id,client);

    client.on('data',function(data){


        data = data.toString();

        if(data == 'shutdown\r\n'){

            channel.emit('shutdown');
        }

        channel.emit('broadcast',id,data)

    });
    client.on('close',function(){

        channel.emit('leave',id);
    });
    

})

server.listen(8888)
