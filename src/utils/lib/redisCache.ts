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
    // get data from redis
    async getFromCache(key: string) {
        const data: string = await this.redisClient.get(key);
        return data ?? false;
    }
    // save data to redis and set default expiry to 7 days
    async saveToCache(key: string, data: string, expiry: number = 7) {
        await this.deleteFromCache(key);
        await this.redisClient.set(key, data, 'EX', expiry * 24 * 60 * 60);
        return true;
    }
    // delete data from redis
    async deleteFromCache(key: string) {
        await this.redisClient.del(key);
        return true;
    }

}
