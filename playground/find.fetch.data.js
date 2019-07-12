const mongodbclient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

mongodbclient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return console.log("user unable to connect with database");
    }
    //console.log(db);
    console.log("user connect with database");
    /*
    //simple fetch data
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },err => {
        console.log("unable to fetch data",err);
});
    //fetch based on id
    db.collection('Todos').find({_id:new ObjectId("5d2836b62dea682424836280")}).toArray().then((docs) => {
       console.log(JSON.stringify(docs,undefined,3));
    },err => {
    console.log("unable to fetch data",err);
});
*/
    //count data
    db.collection('Todos').find().count().then((count) => {
        console.log(`TodoCount ${count}`);
    },(err) =>
    {
    console.log("unable to fetch data: ", err);
    });

    //fatch matched data
    db.collection('Todos').find({text:"to do"}).toArray().then((docs) => {
        console.log(JSON.stringify(docs,undefined,2));
},err =>
    {
    console.log("cant't fatch data: ", err);
    });
    db.close();
});
