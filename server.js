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
        if (req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
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
        const user = new User({
            username: req.body.username,
            age: req.body.age,
            hobbies: req.body.hobbies
        });

        if (!req.body.username || !req.body.age || !req.body.hobbies) {
            res.status(400);
            res.json({msg: `Invlid request body`})
        } else {
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
    try {
        User.findOneAndReplace({_id: req.params.id}, req.body).then(data => {
            res.status(200);
            res.json({mesg: 'User updated successfully.'});
        }).catch(error => {
            res.status(500);
            res.json({error})
        })
    } catch {
        res.status(500);
        res.json({error})
    }
})

app.delete('/api/users/:id', (req,res) => {
    try {
        User.deleteOne({_id: req.params.id}).then(data => {
            res.status(200);
            res.json({msg : 'User deleted successfully.'})
        })
    } catch (error) {
        res.status(500);
        res.json({error})
    }
})


connect().then(() => {
    app.listen(port, () => {
        console.log(`Server initialized successfully on ${port}`);
    });
}).catch(error => {
    console.log(error);
})