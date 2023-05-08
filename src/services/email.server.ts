import {  Queue } from "bullmq";
import connection from "../config/redis.config";

export default new Queue(String(process.env.EMAIL_QUEUE_NAME), { connection });