import express from "express";
import 'dotenv/config'
const port = process.env.PORT || 8080;
const app = express();
import connect from './connection/connection.js';
import User from "./model/user.js";

app.use(express.json());

app.get('/api/users', (req, res) => {
    try {
        User.find({}).then(data => {
            res.json(data);
        }).catch(error => {
            res.json({error})
        })
    } catch (error) {
        res.json(error);
    }
})

app.get('/api/users/:id', (req,res) => {
    try {
        if (req.params.id) {
            User.findOne({id: req.params.id}).then(data => {
                res.json(data);
            }).catch(error => {
                res.json({error})
            })
        }
    } catch (error) {
        res.json({error})
    }
})

app.post('/api/users', (req,res) => {
    try {
        const user = new User({
            id: req.body.id,
            username: req.body.username,
            age: req.body.age,
            hobbies: req.body.hobbies
        });
        user.save().then(  function() {
            return res.json({msg: 'User added successfully'});
        }).catch(error => {
            return res.json({error});
        })
    } catch (error) {
        return res.json({error});
    }
})




connect().then(() => {
    app.listen(port, () => {
        console.log(`Server initialized successfully on ${port}`);
    });
}).catch(error => {
    console.log(error);
})