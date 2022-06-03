const { MongoClient } = require('mongodb');

class mongoCache {
    async constructor(url, dbName) {
        this.client = new MongoClient(url);
        this.dbName = dbName;
        await this.client.connect();
        this.db = this.client.db(dbName);
        this.collection = this.db.collection("Env_Data")
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
