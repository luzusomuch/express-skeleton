import queue from './queue';

exports.configSocket = function(io) {
  io.on('connection', function(socket) {
    console.log('user connected to socket');

    socket.on('disconnect', () => {
      console.log('user disconnected from socket');
    });

    socket.on('join', id => {
      console.log('user joined room ', id);
    });

    // to execute the queue use as below
    
    // queue.create('emitSocket', {
    //   channel: 'new-chat-msg',
    //   room: 'abc',
    //   content: 'zxc'
    // }).save();

    queue.process('emitSocket', (job, done) => {
      const channel = job.data.channel;
      delete job.data.channel;
      const data = job.data;
      console.log(`queue process ${channel}`);
      console.log(data);
      socket.emit(channel, data);
      done();
    });
  });
}