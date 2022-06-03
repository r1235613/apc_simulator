const { MongoClient } = require('mongodb');

class mongoCache {
    constructor(url, dbName) {
        this.client = new MongoClient(url);
        this.dbName = dbName;
    }

    async init(callback){
        callback.bind(this)();
    }

    async add(ind, val){
        await this.collection.insertOne({name: ind, value: val})
    }

    async set(ind){
        return await this.collection.findOne({name: ind})
    }

    async close(){
        await this.client.close()
    }
}

module.exports = mongoCache;
