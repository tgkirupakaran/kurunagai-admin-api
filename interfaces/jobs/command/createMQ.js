const { Queue: QueueMQ, Worker, QueueScheduler } = require('bullmq');
const redisOptions =require('../../../config/redisConfig')
const createQueueMQ = (name) => new QueueMQ(name, { connection: redisOptions });

function setupMQ () {
    const registrationQueue = createQueueMQ('registration-jobs');
    const sendEmailQueue = createQueueMQ('send-email-jobs');
    const uploadQueue = createQueueMQ('upload-jobs');
    return { registrationQueue, uploadQueue, sendEmailQueue }
}

module.exports = setupMQ