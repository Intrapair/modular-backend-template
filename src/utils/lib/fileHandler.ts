import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import path from 'path';

const s3 = new S3({
    credentials: {
        accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_S3_SECRET_ACCESS_KEY)
    }
});

/**
 * Delete file from local storage
 * @param path 
 * @returns boolean
 */
export const unlinkFile = (path: string): boolean => {
    try {
        fs.unlink(path, (err) => {
            if(err) throw new Error(err.message); // unable to delete file
            return true;
        });
    } catch (error) {
        // TODO: log error to logger
        return false;
    }
}

/**
 * Upload file to AWS bucket
 * @param uploadPath folder to upload the file to
 * @param file the file name to upload
 * @returns Image object or boolean
 */
export const uploadFileToAWS = async (uploadPath: string, filename: string) => {
	try {
        let localFilePath = path.join(__dirname, '../../uploads', filename);
		let image = await s3.upload({
            Bucket: String(process.env.AWS_S3_BUCKET_NAME),
            Key: `${uploadPath}/${filename}`,
            Body: fs.createReadStream(localFilePath)
        }).promise()
        return image;
	} catch (error) {
		return false;
	}
};

/**
 * Delete file from AWS bucket
 * @param path URL of the file to delete
 * @returns boolean
 */
export const deleteFileFromAWS = async (path: string): Promise<boolean> => {
	try {
		const file = path.split("amazonaws.com/")[1];
		await s3
			.deleteObject({
				Bucket: String(process.env.AWS_S3_BUCKET_NAME),
				Key: file,
			})
			.promise();
		return true;
	} catch (error) {
		return false;
	}
};
