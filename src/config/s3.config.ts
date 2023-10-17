import 'dotenv/config'; // load env variables

import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
    credentials: {
        accessKeyId: String(process.env.AWS_S3_BUCKET_ID),
        secretAccessKey: String(process.env.AWS_S3_BUCKET_SECRET),
    },
});

export default s3;
