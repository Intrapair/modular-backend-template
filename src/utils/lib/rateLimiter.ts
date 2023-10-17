interface IRateLimiter {
    prefix?: string;
    duration?: number;
    attempts?: number;
    maxAttempts?: number;
    redisClient: any;
}

interface IRateLimiterData {
    attempts: number;
    maxAttempts: number;
    ttl: number;
}

export default class RateLimiter {
    /**
     * Redis key prefix
     */
    protected prefix: string = 'LIMIT_THRESHOLD_';

    /**
     * The duration (in minutes) for which the login threshold will be active
     */
    protected duration: number = 10;

    /**
     * The number of attempts allowed within the duration before applying the login threshold
     */
    protected attempts: number = 1;

    /**
     * The maximum number of login attempts allowed before temporarily disabling the account
     */
    protected maxAttempts: number = 5;

    /**
     * The Redis client instance used for storing and retrieving login attempt data
     */
    private redisClient: any;

    constructor(opts: IRateLimiter) {
        this.prefix = opts.prefix || this.prefix;
        this.duration = opts.duration || this.duration;
        this.attempts = opts.attempts || this.attempts;
        this.maxAttempts = opts.maxAttempts || this.maxAttempts;
        this.redisClient = opts.redisClient;
    }

    async consume(key: string): Promise<IRateLimiterData> {
        return new Promise(async (resolve, reject) => {
            const resp = await this.get(key);
            if (!resp) {
                const data: IRateLimiterData = {
                    attempts: this.attempts,
                    maxAttempts: this.maxAttempts,
                    ttl: 0,
                };
                // console.log('no resp ===>', data);
                await this.set(key, JSON.stringify(data), this.duration);
                return resolve(data);
            } else {
                const jsonData = JSON.parse(resp) as IRateLimiterData;
                // console.log('found ==>', jsonData);
                jsonData.attempts = jsonData.attempts + 1;
                // check if request has reached threshold limit
                if (jsonData.attempts === jsonData.maxAttempts) {
                    const d = new Date();
                    d.setMinutes(d.getMinutes() + this.duration);
                    jsonData.ttl = d.getTime();
                    await this.remove(key);
                    // console.log('attempt matched ===>', jsonData);
                    await this.set(
                        key,
                        JSON.stringify(jsonData),
                        this.duration
                    );
                } else if (jsonData.attempts > jsonData.maxAttempts) {
                    // console.log('attempt exceeded ===>', jsonData);
                    return reject(jsonData);
                } else {
                    await this.remove(key);
                    // console.log('updating ===>', jsonData);
                    await this.set(
                        key,
                        JSON.stringify(jsonData),
                        this.duration
                    );
                }
                return resolve(jsonData);
            }
        });
    }

    /**
     * The redis key to be set
     * @param key string
     * @returns string
     */
    private getKey(key: string): string {
        return this.prefix + key;
    }

    /**
     * Save the record to redis
     * @param key the key to be set
     * @param value the value to be set
     * @param expires the ttl in minutes
     */
    private async set(key: string, value: string, expires: number) {
        return await this.redisClient.set(
            this.getKey(key),
            value,
            'EX',
            expires * 60
        );
    }

    /**
     * Get record from redis
     * @param key string
     * @returns
     */
    private async get(key: string) {
        return await this.redisClient.get(this.getKey(key));
    }

    /**
     * Delete the record created in redis
     * @param key string
     */
    async remove(key: string) {
        return await this.redisClient.del(this.getKey(key));
    }
}
