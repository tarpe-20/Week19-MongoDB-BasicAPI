const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myJokes', {useUnifiedTopology: true});

const app = express();
app.use(express.urlencoded({extended: true}));

const myJokeSchema = {
    title: String,
    content: String 
};

const MyJoke = mongoose.model("MyJoke", myJokeSchema);

app.get('/', (req, res) => {
    MyJoke.find((error, myJokes) => {
        if(!error) {
            res.send(myJokes);
        }
        else {
            res.send(error);
        }
    });

});

app.post('/', (req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);
    let newJoke = new MyJoke({
        title: req.body.title,
        content: req.body.content
    });
    newJoke.save((error)=> {
        if(!error){
            res.send('joke successfully added');
        } else {
            res.send(error);
        }
    });
});

app.delete('/:jokeTitle', (req, res)=> {
    console.log(req.params.jokeTitle);
    MyJoke.deleteOne(
        {title: req.params.jokeTitle},
        (error) => {
            if(!error){
                res.send('joke deleted');
            }
            else {
                res.send(error);
            }
        });
});


app.listen(3000, ()=> {
    console.log('server is running');
});