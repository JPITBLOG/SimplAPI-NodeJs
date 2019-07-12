const mongodbclient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

mongodbclient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log("user unable to connect with database");
    }
    //console.log(db);
    console.log("user connect with database");
    //delete many data
    /*
    db.collection('Todos').deleteMany({text:"something i"}).then((result) => {
        console.log(JSON.stringify(result,undefined,2));
    },err => {
        console.log("error in delete: ",err)
});
    */
    //delete one
    /*
    db.collection('Todos').deleteOne({text:"something i"}).then((result) => {
        console.log(JSON.stringify(result,undefined,2));
    },err => {
        console.log("error in delete: ",err)
});
    */
    /*
    //delete by id
    db.collection('Todos').deleteMany({_id:new ObjectId("00002b7275432d24fc52d643")});
    //find and delete
    db.collection('Todos').findOneAndDelete({_id:new ObjectId("00000001887f4a121479f18f")});
    */
});
