const express=require('express');
const userData=require('./MOCK_DATA.json');
const fs=require('fs');

const { urlencoded, json } = require('body-parser');


const app=express();

app.use(express.urlencoded({extended:false}));
app.get("/api/users",(req,res)=>{
    res.json(userData);
})

app.get("/api/users/:id",(req,res)=>{
    const userId=Number(req.params.id);
    const info=userData.find(user => user.id===userId);
    res.json(info);
})

app.post("/api/users",(req,res)=>{
    const bodyData=req.body; 
   userData.push({...bodyData,id: userData.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(userData),(err,data)=>{
        res.json({...bodyData,id: userData.length})
    });
})

app.delete("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    userData.splice(id-1,1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(userData),(err,data)=>{
        res.json({status:"deleted",
                   key :id})
    })
})

app.listen(8000,()=>{
    console.log("Server started at http://localhost:8000");
})