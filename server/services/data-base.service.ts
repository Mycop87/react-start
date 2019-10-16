export {};
const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://admin:admin@localhost:27017';
const dbName      = 'vue';

class DataBaseService {
  async insertDocument (collectionName: string, object: any) {
    const client = await MongoClient.connect(url, {
                                      useNewUrlParser:    true,
                                      useUnifiedTopology: true,
                                    })
                                    .catch((err: any) => {console.log(err);});
    if (!client) {
      return;
    }
    try {
      const db         = client.db(dbName);
      const collection = db.collection(collectionName);
      let res          = await collection.insertOne(object);
      return res.ops[0];
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  };

  async getDocuments (collectionName: string) {
    const client = await MongoClient.connect(url, {
                                      useNewUrlParser:    true,
                                      useUnifiedTopology: true,
                                    })
                                    .catch((err:any) => {console.log(err);});
    if (!client) {
      return;
    }
    try {
      const db         = client.db(dbName);
      const collection = db.collection(collectionName);
      let res          = await collection.find({}).toArray();
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  };

  async getDocument (collectionName: string, object: any) {
    const client = await MongoClient.connect(url, {
                                      useNewUrlParser:    true,
                                      useUnifiedTopology: true,
                                    })
                                    .catch((err:any) => {console.log(err);});
    if (!client) {
      return;
    }
    try {
      const db         = client.db(dbName);
      const collection = db.collection(collectionName);
      let res          = await collection.findOne(object);
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  };

  async deleteDocument (collectionName: string, object: any) {
    const client = await MongoClient.connect(url, {
                                      useNewUrlParser:    true,
                                      useUnifiedTopology: true,
                                    })
                                    .catch((err:any) => {console.log(err);});
    if (!client) {
      return;
    }
    try {
      const db         = client.db(dbName);
      const collection = db.collection(collectionName);
      let res          = await collection.deleteOne(object);
      return res ? true : false;
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
  async updateDocument (collectionName: string, searchCriteria: any, updateData:any) {
    const client = await MongoClient.connect(url, {
                                      useNewUrlParser:    true,
                                      useUnifiedTopology: true,
                                    })
                                    .catch((err:any) => {console.log(err);});
    if (!client) {
      return;
    }
    try {
      const db         = client.db(dbName);
      const collection = db.collection(collectionName);
      let res          = await  collection.updateOne(searchCriteria, {$set: updateData});
      return res ? true : false;
    } catch (err) {
      console.log(err);
    } finally {
      client.close();
    }
  }
}

module.exports = new DataBaseService();
