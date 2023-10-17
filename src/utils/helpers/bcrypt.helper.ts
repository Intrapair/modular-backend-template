import bcrypt from 'bcryptjs';

/**
 * Bcrypt helper to hash password
 * @param password password to be hashed
 * @return the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

/**
 * Bcrypt helper to compare hashed password
 * @param password password to be compared
 * @param hashedPassword hashed password
 * @return boolean
 */
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
