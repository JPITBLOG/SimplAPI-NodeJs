const mongoClient = require('mongodb').MongoClient;
//destructuring
var user = {name:"jigar",age:15};
var {age} = user;
console.log(age);
const {MongoClient,ObjectId} = require('mongodb');
var obj = new ObjectId();
console.log(obj);

mongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log("unable connect with Mongodb server");
    }
    console.log('Connect to mongodb server');
    db.collection('Todos').insertOne({
        //_id:ObjectId("00002b7275432d24fc52d641"),
        text:"something i think wrong here",
        completed:false
    },(err,result) => {
        if(err){
            return console.log("unable to insert todo",err);
        }
        //console.log(JSON.stringify(result.ops,undefined,2));
        console.log(result.ops[0]._id.getTimestamp());
    })
    db.close();
})