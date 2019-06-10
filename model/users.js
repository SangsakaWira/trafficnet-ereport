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
    tipe_user:{
        type:String,
        required:true
    },
    tipe_servis:{
        type:String
    },
    password:{
        type:String,
        lowercase:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("password format invalid, it may not contains 'password'")
            }
        },
        trim:true,
        required:true
    },
    noktp:String
})

let users = mongoose.model("user",fieldSchema)

module.exports = users