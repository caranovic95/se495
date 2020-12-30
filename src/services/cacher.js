

let instance = null;

export class Cacher {
    cache = {};

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    isValueCached(key) {
        return this.getValue(key);
    }

    cacheValue(key, value) {
        this.cache[key] = value;

    }

    getValue(key) {
        return this.cache[key];
    }
}