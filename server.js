const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/trafficnet-ereport",{useNewUrlParser:true})

let urlencodedParser = bodyParser.urlencoded({
    extended: false
})

let port = process.env.PORT || 7000;
const app = express()

let laporan = require("./model/laporan")
let user = require("./model/users")

// REGISTER
app.post("/register", urlencodedParser, function (req, res) {
    let data_user = req.body
    console.log(req.body)
    user.findOne({
        username: data_user.username,
        email: data_user.email
    }, function (err, data) {
        console.log(data)
        if (err) {
            console.log("Something went wrong! ",err)
        } else {
            if (data == null) {
                console.log(req.body.password)
                console.log(req.body.confirmpass)
                if(req.body.password === req.body.confirmpass){
                    user.create(data_user, function (err) {
                        if (err) {
                            console.log("Something is wrong! ",err)
                            res.redirect("/register")
                        } else {
                            res.send({
                                message: "Success"
                            })
                        }
                    })
                }
                else{
                    res.send({
                        message:"password is not same as confirmed"
                    })
                }
            } else {
                res.send({
                    message: "Email or Username is already taken"
                })
            }
        }
    })
})


// LOGIN
app.post("/login", urlencodedParser, function (req, res) {
    user.findOne({
        username: req.body.email,
        password: req.body.password
    }, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

// GET ALL USER DEMO NTAR PASS TAK HILANGIN
app.get("/users", function (req, res) {
    user.find(function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

// GET ALL USER BY ID
app.get("/user/:id", function (req, res) {
    user.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.patch("/user/:id",urlencodedParser,function(req,res){
    user.findByIdAndUpdate(req.params.id, req.body
        ,{new: true},function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

// GET ALL LAPORAN
app.get("/laporan", function (req, res) {
    laporan.find(function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

// GET ALL LAPORAN BY ID
app.get("/laporan/:id", function (req, res) {
    laporan.findById(req.params.id, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.post("/laporan",urlencodedParser,function(req,res){
    laporan.create({
        status:req.body.status,
        jenis_laporan:req.body.jenis_laporan,
        long:req.body.long,
        lat:req.body.lat,
        tanggal:new Date()
    }, function (err, data) {
        if (err) {
            console.log("Something went wrong",err)
        } else {
            res.send(data)
        }
    })
})

app.patch("/laporan/:id", urlencodedParser,function(req,res){
    laporan.findByIdAndUpdate(req.params.id,req.body
        ,{new: true},function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.delete("/laporan/:id",function(req,res){
    laporan.findByIdAndDelete(req.params.id,function(err,data){
        if(err){
            console.log("Not Success")
        }else{
            res.send(data)
        }
    })
})

app.get("/register",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.get("/laporanpage",function(req,res){
    res.sendFile(__dirname+"/laporan.html")
})

app.listen(port,function(){
    console.log("Server is running")
})

app.get("laporanbystatus/:filter",function(req,res){
    laporan.find({
        status:req.params.filter
    },function(err,doc){
        if(err){
            res.send(err)
        }else{
            res.send(doc)
        }
    })
})

app.get("laporanbyjenis/:filter",function(req,res){
    laporan.find({
        jenis_laporan:req.params.filter
    },function(err,doc){
        if(err){
            res.send(err)
        }else{
            res.send(doc)
        }
    })
})