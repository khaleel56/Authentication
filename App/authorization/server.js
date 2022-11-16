
require('dotenv').config();
const express = require('express')
const jwt = require('jsonwebtoken')

const app= express();
app.use(express.json());

const post=[
    {
        username: "khaleel",
        title:"post 1"
    },
    {
        username: "shaik",
        title:"post 2"
    }
]
app.get("/posts", authenticateToken,(req, res)=>{
    res.json(post.filter(post=>post.username == req.user.name))
})


function authenticateToken(req, res, next){
    const authHeader =req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        req.user =user
        next();
    })
}

app.listen(4000, ()=>console.log('app listening at http://localhost:4000/'))

