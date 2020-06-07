/**
 * Response caching class.
 *
 * @class ResponseCache
 */
class ResponseCache {

    /**
     * Creates an instance of ResponseCache.
     * @param {number} [timeToLive=86400(minutes)]
     * @memberof ResponseCache
     */
    constructor(timeToLive = 86400) {
        this.millisecondsToLive = timeToLive * 60 * 1000;
        this.cache = null;
        this.getCachedData = this.getCachedData.bind(this);
        this.setCachedData = this.setCachedData.bind(this);
        this.resetCache = this.resetCache.bind(this);
        this.isCacheExpired = this.isCacheExpired.bind(this);
    }

    /**
     * Checks cache expiry.
     *
     * @returns
     * @memberof ResponseCache
     */
    isCacheExpired() {
        return (new Date().getTime() + this.millisecondsToLive) < new Date().getTime();
    }

    /**
     * Creates singleton for Cache.
     *
     * @returns
     * @memberof ResponseCache
     */
    getInstance() {
        if (!this.instance || this.isCacheExpired()) {
            this.instance = new ResponseCache();;
        }
        return this.instance;
    }

    /**
     * Caches api response.
     *
     * @param {*} data --{object}
     * @memberof ResponseCache
     */
    setCachedData(data) {
        if (data) {
            this.cache = data;
        }
    }

    /**
     * Returns cached api response.
     *
     * @returns new Promise
     * @memberof ResponseCache
     */
    getCachedData() {
        return new Promise((resolve, reject) => {
            if (this.cache && !this.isCacheExpired()) {
                resolve(this.cache);
            } else {
                reject('cache not available')
            }
        });
    }

    /**
     * Reset in memory cache.
     *
     * @memberof ResponseCache
     */
    resetCache() {
        this.cache = null;
    }

}

module.exports = ResponseCache;