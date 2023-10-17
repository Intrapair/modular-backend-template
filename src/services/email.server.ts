import { Queue } from 'bullmq';
import connection from '../config/redis.config';

const dummyEmailQueue = {
    async add(name: string, data: any) {
        console.log(name, data);
        return true;
    },
};

export default process.env.NODE_ENV === 'test'
    ? dummyEmailQueue
    : new Queue(process.env.EMAIL_QUEUE_NAME, { connection });
