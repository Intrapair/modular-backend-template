import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { tokenGenerator } from './keyGenerator';
import { fileURLToPath } from 'url';
import AppError from './appError';
import { StatusCodes } from 'http-status-codes';
import s3 from '../../config/s3.config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fileFilter(req: any, file: any, cb: any) {
    // check if the file is an image
    if (!file.mimetype.startsWith('image')) {
        return cb(
            new AppError('Only image is allowed', StatusCodes.BAD_REQUEST)
        );
    }
    // To accept the file pass `true`, like so:
    return cb(null, true);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, tokenGenerator(8) + path.extname(file.originalname));
    },
});

/**
 * Upload file to local storage using multer
 * @returns multer object
 */
export const uploadFile = multer({
    fileFilter,
    storage,
    limits: { fileSize: 1024 * 1024 * 2 },
});

/**
 * Delete file from local storage
 * @param path
 * @returns boolean
 */
export const unlinkFile = (path: string): boolean => {
    try {
        fs.unlink(path, (err) => {
            if (err) throw new Error(err.message); // unable to delete file
            return true;
        });
    } catch (error) {
        // TODO: log error to logger
        return false;
    }
};

/**
 * Upload file to AWS bucket
 * @param uploadPath folder to upload the file to
 * @param file the file name to upload
 * @returns Image object or boolean
 */
export const uploadFileToAWS = async (
    uploadPath: string,
    filename: string,
    deleteLocalFile: boolean = true
) => {
    try {
        let localFilePath = path.join(__dirname, '../../uploads', filename);
        let image = await s3
            .upload({
                Bucket: String(process.env.AWS_S3_BUCKET_NAME),
                Key: `${uploadPath}/${filename}`,
                Body: fs.createReadStream(localFilePath),
            })
            .promise();
        if (deleteLocalFile) unlinkFile(localFilePath);
        return image;
    } catch (error) {
        console.log('error', error);
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
        const file = path.split('amazonaws.com/')[1];
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
