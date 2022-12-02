import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({ limit:'30mb',extended: true }))
app.use(bodyParser.urlencoded({ limit:'30mb',extended: true }));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes);

app.get('/', (req,res)=>{
    res.send('APP IS RUNNING ON BACKEND');
})

const CONNECTION_URL = "mongodb+srv://arijitghosh10:%40rijitGHOSH10@cluster0.8be6r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, ()=>console.log(`server running on port ${PORT}`)))
.catch((error)=>console.log(error));

//mongoose.set('useFindAndModify', false);
