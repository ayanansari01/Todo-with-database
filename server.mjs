import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';



let todoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    classId: String,
    createdOn: { type: Date, default: Date.now }
});
const todoModel = mongoose.model('todos', todoSchema);



const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.post('/todo', (req, res) => {

    todoModel.create({ text: req.body.text }, (err, saved) => {
        if (!err) {
            console.log(saved);

            res.send({
                message: ""
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    })
})
app.get('/todos', (req, res) => {

    todoModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "here is you todo list",
                data: data
            })
        }else{
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

app.delete('/todos', (req, res) => {

    mongoose.connection.db.dropCollection('todos', function (err, result) {
        if (!err) {
            res.send({
                message: "all todo deleted",
            })
        }else{
            res.status(500).send({
                message: "server error"
            })
        }
    });
})
app.listen(port, () => {
    console.log(`Server app is listening on port ${port}`)
})


/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = 'mongodb+srv://ayanansari01:Supergamer5@cluster0.uhvof3p.mongodb.net/database1?retryWrites=true&w=majority';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////