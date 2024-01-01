import express from "express";
import 'dotenv/config'
const port = process.env.PORT || 8080;
const app = express();
import connect from './connection/connection.js';

app.use(express.json());

app.get('/api/', (req,res) => {
    try {
        res.json("api hit successfully");
    } catch (error) {
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