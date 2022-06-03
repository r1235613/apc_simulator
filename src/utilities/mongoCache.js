const { MongoClient } = require('mongodb');

class mongoCache {

    async init(url, dbName){
        this.client = new MongoClient(url);
        this.dbName = dbName;
        await this.client.connect().then;
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection("Env_Data")
    }

    async set(ind, val){
        const ft = await this.collection.find({name: ind}).toArray();
        if (ft.length === 0){
            await this.collection.insertOne({name: ind, value: val})
        }else {
            await this.collection.updateOne({ name: ind }, { $set: { value: val } });
        }

    }

    async get(ind){
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
