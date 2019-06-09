const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const validator = require("validator")

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
express.static(__dirname)

mongoose.connect("mongodb://localhost/playground-data",{useNewUrlParser:true})

let user = mongoose.model("playground",{
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        minlegth:7,
        validate(value){
            if(value.includes("password")){
                throw new Error("length must be longer than 6 letters or the password contain 'password' ")
            }

        }
    },
    confirmpass:String,
    date:{
        type:Date,
        default:Date.now
    }
})

app.get("/register",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/register",function(req,res){
    user.create(req.body,function(err,data){
        if(err){
            res.send({
                message:err
            })
        }else{
            res.send({
                message:"success",
                data:data
            })
        }
    })
})

app.listen(3000,function(){
    console.log("Server is running")
})