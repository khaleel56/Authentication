const express = require('express')
const app = express()
const bcrypt= require('bcrypt')

app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.listen(3000, ()=>console.log('app listening at http://localhost:3000/'));
const users=[{
    "name":"khaleel",
    "password":"hello"
}]

app.get("/", (req, res)=>{
        res.json(users)
})  

app.post('/users', async(req, res)=>{
    try{
        // const salt =await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
         console.log(hashedPassword);
        const user = { name: req.body.name, passowrd: hashedPassword}
        users.push(user)
        res.status(201).send(users);
    }catch(err){
        console.log(err)

    }
})

app.post('/users/login', async(req, res)=>{
    try{
        const user=users.find(user=>user.name==req.body.name)
        if(user==null){
                console.log('user not found')
        }else{
            console.log('user found->',{user})
        
        const { passowrd} = user;
        console.log(passowrd, req.body.password)
        if(await bcrypt.compare(req.body.password, passowrd)){
            res.send('success')
        } else{
            res.send('failure')
        }
        }

    }catch(err){
        console.log(err)

    }
    console.log(req.body)


})