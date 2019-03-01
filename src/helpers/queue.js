import kue from 'kue';
const queue = kue.createQueue();

module.exports = queue;