const { MongoClient } = require('mongodb');

class mongoCache {
    constructor(url, dbName) {
        this.client = new MongoClient(url);
        this.dbName = dbName;
        this.collection = null;
    }

    async init(callback){
        callback.bind(this)();
    }

    async add(ind, val){
        await this.collection.insertOne({name: ind, value: val})
    }

    async set(ind){
        const ft = await this.collection.find({name: ind}).toArray();
        if (ft.length === 0){
            return []
        }else {
            return ft[0]
        }
    }

    async close(){
        await this.client.close()
    }
}

module.exports = mongoCache;
