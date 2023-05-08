import { Request } from 'express';
import formidable from "formidable";
import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import { tokenGenerator } from './keyGenerator';
import path from 'path';

/**
 * Parse form-data, upload files to AWS and clean the temp file in local storage
 * @param req Request object
 * @param uploadPath Folder where the file should be uploaded in AWS
 * @param filename The name of the file field
 * @param isRequired Boolean to let us know if file upload is required or not
 * @returns Object
 */
export const uploadFile = async (req: Request, uploadPath: string, filename: string, isRequired: boolean = true) => {
    return new Promise((resolve, reject) => {
        let options = {
            allowEmptyFiles: false,
            maxFileSize: 5 * 1024 * 1024,
            uploadDir: path.join(__dirname, '../../uploads'),
            fileName: tokenGenerator(9),
            keepExtensions: true,
            filter: function ({mimetype}: any) {
                // keep only images
                return mimetype && mimetype.includes("image");
            }
        }
        const form = formidable({ ...options });
        form.parse(req, async (err, fields, files: any) => {
            if(err) {
                // TODO: log error to logger
                return reject({status: false, message: 'Unable to parse uploaded file'});
            }

            if(!files[filename] && !isRequired) {
                return resolve({status: false, fields, message: 'No file was uploaded'})
            }

            if(!files[filename] && isRequired) {
                return reject({status: false, message: 'No file was uploaded'});
            }
            const s3 = new S3({
                credentials: {
                    accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_ID),
                    secretAccessKey: String(process.env.AWS_S3_SECRET_ACCESS_KEY)
                }
            });

            let localFilePath = path.join(__dirname, '../../uploads', files[filename].newFilename);

            let image = await s3.upload({
                Bucket: String(process.env.AWS_S3_BUCKET_NAME),
                Key: `${uploadPath}/${files[filename].newFilename}`,
                Body: fs.createReadStream(localFilePath)
            }).promise()

            unlinkFile(localFilePath);

            return resolve({status: true, fields, image});
        })
    })
}

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
 * Delete file from AWS bucket
 * @param path URL of the file to delete
 * @returns boolean
 */
export const deleteFile = async (path: string): Promise<boolean> => {
	try {
		const file = path.split("amazonaws.com/")[1];
		const s3 = new S3({
			credentials: {
				accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_ID),
				secretAccessKey: String(process.env.AWS_S3_SECRET_ACCESS_KEY),
			},
		});
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