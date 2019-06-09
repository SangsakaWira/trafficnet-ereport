const mongoose = require("mongoose")
const validator = require("validator")

mongoose.connect("mongodb://localhost/trafficnet-ereport",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("is not email")
            }
        },
        lowercase:true,
        required:true

    },
    password:{
        type:String,
        lowercase:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("password format invalid, may not contains 'password'")
            }
        },
        trim:true,
        required:true
    },
    noktp:String,
    confirmpass:String
})

let users = mongoose.model("user",fieldSchema)

module.exports = users