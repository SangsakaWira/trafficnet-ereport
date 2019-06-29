const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/trafficnet-ereport",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    status:{
        type:String
    },
    jenis_laporan:String,
    pukul:{
        type:Date,
        trim:true
    },
    long:String,
    lat:String,
    tanggal:Date,
    
})

let laporan = mongoose.model("laporan",fieldSchema)

module.exports = laporan