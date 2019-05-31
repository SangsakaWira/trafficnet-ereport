const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/trafficnet-ereport",{useNewUrlParser:true})

const fieldSchema = mongoose.Schema({
    status:String,
    jenis_laporan:String,
    pukul:String,
    long:String,
    lat:String,
    tanggal:String
})

let laporan = mongoose.model("laporan",fieldSchema)

module.exports = laporan