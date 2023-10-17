import { randomBytes } from 'crypto';

/**
 * This function is used to generated random token of a specific length
 * @param len - Token size to be generated
 * @return token - The generated token
 **/
export const tokenGenerator = (len: number): string =>
    randomBytes(len).toString('hex');

/**
 * This function is used to generated random otp code of a specified length
 * @param len - Token size to be generated default is 4
 * @return code - The generated otp code
 **/
export const otpGenerator = (len: number = 4): string =>
    String(Math.ceil(Math.random() * 10 ** len)).padEnd(len, '0');
