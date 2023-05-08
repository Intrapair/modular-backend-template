import { ConnectionOptions } from "bullmq";

const connection: ConnectionOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
}

export default connection;