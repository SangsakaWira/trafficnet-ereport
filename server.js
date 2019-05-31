const express = require("express");
const bodyParser = require("body-parser")

let urlencodedParser = bodyParser.urlencoded({
    extended: false
})

let port = process.env.PORT || 3000;
const app = express()

let laporan = require("./model/laporan")
let user = require("./model/users")

// REGISTER
app.post("/register", urlencodedParser, function (req, res) {
    let data_user = req.body
    console.log(data_user.email)
    console.log(data_user.name)
    user.findOne({
        username: data_user.name,
        email: data_user.email
    }, function (err, data) {
        console.log(data)
        if (err) {
            console.log("Something went wrong")
        } else {
            if (data == null) {
                user.create(data_user, function (err) {
                    if (err) {
                        console.log("Something is wrong!")
                    } else {
                        res.send({
                            message: "Success"
                        })
                    }
                })
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
app.get("/user", function (req, res) {
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
    laporan.create(req.body, function (err, data) {
        if (err) {
            console.log("Something went wrong")
        } else {
            res.send(data)
        }
    })
})

app.listen(port,function(){
    console.log("Server is running")
})
