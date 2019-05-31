const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/trafficnet-ereport",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    noktp:String
})

let users = mongoose.model("user",fieldSchema)

module.exports = users