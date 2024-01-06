import express from "express";
import 'dotenv/config'
const port = process.env.PORT || 8080;
const app = express();
import connect from './connection/connection.js';
import User from "./model/user.js";
import mongoose from "mongoose";
app.use(express.json());

app.get('/api/users', (req, res) => {
    try {
        User.find({}).then(data => {
            res.status(200);
            res.json(data);
        }).catch(error => {
            res.status(500);
            res.json({error})
        })
    } catch (error) {
        res.status(500);
        res.json(error);
    }
})

app.get('/api/users/:id', (req,res) => {
    try {
        if (isIdValid(req.params.id)) {
            User.findOne({_id: req.params.id}).then(data => {
                if (data === null) {
                    res.status(404);
                    res.json({msg: `User doesn't exist`})
                } else {
                    res.status(200);
                    res.json(data);
                }
            }).catch(error => {
                res.status(500);
                res.json({error})
            })
        } else {
            res.status(400);
            res.json({msg: 'Invalid id'});
        }
    } catch (error) {
        res.status(500);
        res.json({error})
    }
})

app.post('/api/users', (req,res) => {
    try {
        if (!req.body.username || !req.body.age || !req.body.hobbies) {
            res.status(400);
            res.json({msg: `Invlid request body`})
        } else {
            const user = new User({
                username: req.body.username,
                age: req.body.age,
                hobbies: req.body.hobbies
            });
            user.save().then(data => {
                res.status(201);
                return res.json({
                    data: data,
                    msg: 'User added successfully'
                });
            }).catch(error => {
                res.status(500);
                return res.json({error});
            })
        }
    } catch (error) {
        res.status(500);
        return res.json({error});
    }
})

app.put('/api/users/:id', (req,res) => {
    if (isIdValid(req.params.id)) {
        try {
            User.findOneAndReplace({_id: req.params.id}, req.body).then(data => {
                if (data === null) {
                    res.status(404);
                    res.json({msg: `User doesn't exist`})
                } else {
                    res.status(200);
                    res.json({mesg: 'User updated successfully.'});
                }
            }).catch(error => {
                res.status(500);
                res.json({error})
            })
        } catch {
            res.status(500);
            res.json({error})
        }
    } else { 
        res.status(400);
        res.json({msg: 'Invalid id'});
    }
})

app.delete('/api/users/:id', (req,res) => {
    if (isIdValid(req.params.id)) {
        try {
            User.deleteOne({_id: req.params.id}).then(data => {
                console.log(data);
                if (!data.deletedCount) {
                    res.status(404);
                    res.json({msg: `User doesn't exist`})
                } else {
                    res.status(204);
                    res.json({msg : 'User deleted successfully.'})
                }
            })
        } catch (error) {
            res.status(500);
            res.json({error})
        }
    } else {
        res.status(400);
        res.json({msg: 'Invalid id'});
    }
})

function isIdValid(id) {
    if (id && mongoose.Types.ObjectId.isValid(id)) {
        return true;
    }
    return false;
}

app.use(function(req, res, next) {
    res.status(404);
    res.json({msg: 'Invalid URL'})
});

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server initialized successfully on ${port}`);
    });
}).catch(error => {
    console.log(error);
})