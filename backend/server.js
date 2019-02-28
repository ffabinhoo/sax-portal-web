const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const researchRoutes = express.Router();
const userRoutes = express.Router();
const PORT = 4000;

let Research = require("./models/research.model");
let User = require("./models/user.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/db-sax',{ useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function(){
    console.log('MongoDB database connection established successfully');
})

researchRoutes.route('/').get(function(req, res){
    Research.find(function(err, researchers) {
        if (err) {
            console.log(err);
        } else {
            res.json(researchers);
        }
    });
});



researchRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;

    console.log(id);
    Research.findById(id, function(err, research) {
        res.json(research);
    });
});

researchRoutes.route('/add').post(function(req, res){
    console.log(req.body)
    let research = new Research(req.body);
    research.save()
        .then(research => {
            res.status(200).json({'research': 'research added successfuly'});

        })
        .catch(err => {
            res.status(400).send('adding new research failed');
        });
});



researchRoutes.route('/update/:id').post(function(req, res){
    Research.findById(req.params.id, function(err, research) {
        if (!research)
            res.status(404).send('data is not found');
        else
            research.name = req.body.name;
            research.description = req.body.description;
            research.data = req.body.data;
            research.isEnabled = req.body.isEnabled;
            
            research.save().then(research => {
                res.json('research updated' + JSON.stringify(research));
            })
            .catch(err => {
                res.status(400).send("update not possible");
            });
    });
});

researchRoutes.route('/delete/:id').post(function(req, res, next){
    console.log(req.params.id);
    Research.findByIdAndRemove(req.params.id, (err, research) => {
        if (err) { return next (err); }

        if (!research) { res.status(404).json('No research with that ID'); }

        res.status(200).json(research);
    });
});


//----------------------------USERS---------------------------------
//------------------------------------------------------------------
userRoutes.route('/').get(function(req, res){
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/add').post(function(req, res){
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfuly'});

        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

userRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;

    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/update/:id').post(function(req, res){
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send('data is not found');
        else
            user.name = req.body.name;
            user.login = req.body.login;
            user.isEnabled = req.body.isEnabled;
            
            user.save().then(user => {
                res.json('user updated' + JSON.stringify(user));
            })
            .catch(err => {
                res.status(400).send("user update not possible");
            });
    });
});

//------------------------------------------------------------------
//------------------------------------------------------------------


app.use('/researchers', researchRoutes);
app.use('/users', userRoutes);

app.listen(PORT, function(){
    console.log("server is running on Port:" + PORT)
});
