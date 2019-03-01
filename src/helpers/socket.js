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

    queue.create('emitSocket', {
      channel: 'new-chat-msg',
      room: 'abc',
      content: 'zxc'
    }).save();

    queue.process('emitSocket', (job) => {
      const channel = job.data.channel;
      delete job.data.channel;
      const data = job.data.channel;
      socket.emit(channel, job.data);
    });
  });
}