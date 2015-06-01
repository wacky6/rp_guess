"use strict";

var express = require('express');
var swig    = require('swig');
var bodyParse = require('body-parser');
var roll = require("./roll");
var validate = require('./validate');
var app = express();

app.engine('jss', swig.renderFile);
app.set('view engine', 'jss');
app.set('views', __dirname+"/view");

app.set('view cache', false);
swig.setDefaults({cache:false});

app.use('/static', express.static('static'));

app.get('/', function(req,res){
    var param = {
        num:  roll.remainNum(),
        cash: roll.remainCash(),
        top:  roll.remainTop()
    };
    if (param.num==0) res.render("none_left");
    else res.render('index',param); 
});

app.use(bodyParse.urlencoded({extended:true}));
app.post('/submit.jss', function(req,res){
    // validate alipay/id
    var id = req.body.alipay;
    if (!validate(id)) {
        res.render("check_id");
        return;
    }
    if (roll.remainNum() == 0) {
        res.render("none_left");
    }else{
        var amount = roll.roll(id);
        if (!amount) {
            res.render("already_guessed");
        }else{
            res.render("guessed", {
                cash: amount
            });
        }
    }
});
app.use(function(req,res){
    res.status(404);
    res.end("404");
});

app.listen(12800);
