const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

//get servee.js data
const {app} = require('./../server');
const {Todo} = require('./../model/todo');

/*
const todos = [{text: "first test todo"},
                {text: "second test todo"}];
*/
//test get by entered id
//const id = new ObjectID();
//console.log("this is ur id",id);
const todos = [{
    _id:new ObjectID(),
    text: "first test todo"},
    {   _id:new ObjectID(),
        text: "second test todo"}];
//it is for post
/*
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});
*/

//it is for get

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});


//test using post method
describe('POST/todos',() => {
    it('should create new to do',(done) => {
        var text = "text is test todo";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err,res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should create new with invalid body',(done) => {

        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));

            });
    });
});

//test using post method
describe('GET/todos',() => {
    it('should create new get todo',(done) => {
        request(app)
            .get('/todos')
            .send()
            .expect(200)
            .expect((res) => {
            expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET/todos/:id',() => {
    it('should create get by entered id',(done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
            expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found',(done) => {
       var hex_id = new ObjectID().toHexString();
       console.log("this is hex id",hex_id);

       request(app)
           .get(`/todos/${hex_id}`)
           .expect(400)
           .end(done);
    });
    it('should return 404 for non object id',(done) => {
        //var hex = new ObjectID().toHexString();

        request(app)
            .get(`/todos/123abc`)
            .expect(404)
            .end(done);
    });

})
