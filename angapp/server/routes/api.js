const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router(); 
const mongoose = require('mongoose');
var { Detail } = require('../models/detail');

var db = require('../../config/db');
console.log("connecting--",db);
mongoose.Promise = Promise;

//Mongoose connection
mongoose.connect(db.url, {
    userNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log("connected to the database!");
}).catch(err => {
    console.log("cannot connect to the database",err);
    process.exit();
}); 


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'angular')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}


/*
//retrieve detail by id
router.get('/details/:id', function(req, res){
    console.log('get req for registration details with id:',req.params.id);
    Detail.findById(req.params.id)
    .exec(function(err, details){
        if(err){
            res.send(err);
        }else {
            res.json(details);
        }
    });
});
*/

// retreive all details
router.get('/details', function(req, res){
    console.log('get req for registration details');
    Detail.find(function(err, details) {
        if(err){
            res.send(err);
        }else {
            res.json(details);
        }
    });
});



//Create new detail
router.post('/details', verifyToken, function(req, res){
    console.log('Post student details');
    console.log(req.body);
    var newDetail = new Detail();
    newDetail.username = req.body.username;
    newDetail.email = req.body.email;
    newDetail.phone = req.body.phone;
    newDetail.password = req.body.password;
    newDetail.save(function(err,insertedDetail){
        if(err){
            console.log('Error saving details');
        }
        else{
            let payload = { subject : insertedDetail._id}
            let token = jwt.sign(payload, 'angular')
            res.json({token});
        }
    });
});

router.post('/details/login', function(req, res){
    console.log("posted");
    let userData =  req.body

    Detail.findOne({email: userData.email}, (error,user) =>{
        if(error) {
            console.log(error)
        }else{
            if(!user){
                res.status(401).send("Invalid email")
            }else
            if(user.password !== userData.password){
                res.status(401).send("Invalid PAssword")
            }else{
                let payload = { subjet: user._id}
                let token = jwt.sign(payload, 'angular')
                res.status(200).send({token})
            }
        }
    })
})



// Update existing details
router.put('/details/:id', (req, res) => {
    console.log('update details'); 
    var newvalues = {
        username: req.body.username, 
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    };

    Detail.findByIdAndUpdate(req.params.id,{ $set : newvalues}, { new: true }, function(err, updatedDetail) {
        if(err){
            res.send('Error updating detail')
        }else{
            res.json(updatedDetail);
        }
    });
}); 



// Delete specific detail with id
router.delete('/details/:id', function(req, res){
    console.log('Deleting student details with id:'+req.params.id );
    Detail.findByIdAndRemove(req.params.id, function(err,deletedDetail){
        if(err){
            res.send('Error deleting Details');
        }else{
            res.json(deletedDetail);
        }
    });
});


router.get('/details/events', verifyToken, (req, res) => {
    let events = [
        {
            "_id":"1",
            "name":"NAME",
            "description": "this is the description"
        },
                {
            "_id":"2",
            "name":"NAME",
            "description": "this is the description"
        },
                {
            "_id":"3",
            "name":"NAME",
            "description": "this is the description"
        },
                {
            "_id":"4",
            "name":"NAME",
            "description": "this is the description"
        },
                {
            "_id":"5",
            "name":"NAME",
            "description": "this is the description"
        },
                {
            "_id":"6",
            "name":"NAME",
            "description": "this is the description"
        },
    ]
    res.json(events)
})
module.exports = router;