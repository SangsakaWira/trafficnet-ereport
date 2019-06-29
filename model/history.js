const mongoose = require("mongoose")

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
    route:{
        type:Array
    }
    
})

let laporan = mongoose.model("laporan",fieldSchema)

module.exports = laporan