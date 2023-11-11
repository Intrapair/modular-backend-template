interface IRedisCache {
    redisClient: any;
    prefix?: string;
    defaultDuration?: number;
}

export default class RedisCache {
    /**
     * The Redis client instance used for storing and retrieving data
     */
    protected redisClient: any;
    /**
     * Redis key prefix
     */
    protected prefix: string = 'CACHE_';

    /**
     * The duration (in days) for which the cache will be active
     */
    protected defaultDuration: number = 7;

    constructor(opts: IRedisCache) {
        this.redisClient = opts.redisClient;
        this.prefix = opts.prefix || this.prefix;
        this.defaultDuration = opts.defaultDuration || this.defaultDuration;
    }

    /**
     * Get data from redis
     * @param key string
     * @returns data or false
     */
    async getFromCache(key: string) {
        const data = await this.redisClient.get(this.getKey(key));
        if (data) {
            // console.log('cached')
            try {
                return JSON.parse(data);
            } catch (error) {
                return data;
            }
        }
        // console.log('not cached')
        return;
    }

    /**
     * save data to redis and set default expiry to 7 days
     * @param key the key to be set
     * @param data the data to be saved
     * @param expiry the ttl in minutes
     */
    async saveToCache(
        key: string,
        data: string,
        expiry: number = this.defaultDuration
    ) {
        await this.deleteFromCache(key);
        if (typeof data === 'object') data = JSON.stringify(data);
        await this.redisClient.set(
            this.getKey(key),
            data,
            'EX',
            expiry * 24 * 60 * 60
        );
        return true;
    }

    /**
     * Delete the record created in redis
     * @param key string
     */
    async deleteFromCache(key: string) {
        await this.redisClient.del(this.getKey(key));
        return true;
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
     * Delete all keys with the given prefix
     * @param keyPrefix string
     * @returns boolean
     */
    async deleteAllFromCacheUsingPrefix(keyPrefix: string) {
        const newConnection = this.redisClient.duplicate();
        const keys = await newConnection.keys(this.getKey(keyPrefix) + '*');
        if (keys.length) {
            return this.redisClient.del(keys);
        }
        newConnection.disconnect();
        return false;
    }

    /**
     * Delete all from cache
     * @param keyPrefix string
     * @returns boolean
     */
    async deleteAllFromCache() {
        const newConnection = this.redisClient.duplicate();
        const keys = await newConnection.keys(this.prefix + '*');
        if (keys.length) {
            return this.redisClient.del(keys);
        }
        newConnection.disconnect();
        return false;
    }
}
