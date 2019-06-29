const mongoose = require("mongoose")

const fieldSchema = mongoose.Schema({
    status:{
        type:String
    },
    jenis_laporan:String,
    long:String,
    lat:String,
    tanggal:Date
    
})

let laporan = mongoose.model("laporan",fieldSchema)

module.exports = laporan