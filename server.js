"use strict";

var express = require('express');
var swig    = require('swig');
var bodyParse = require('body-parser');
var cookieParse = require("cookie-parser");
var roll = require("./roll");
var validate = require('./validate');
var crypto = require("crypto");
var uaCheck = require('./ua-check');
var app = express();

var sessKey = crypto.randomBytes(4).toString("hex");

app.engine('jss', swig.renderFile);
app.set('view engine', 'jss');
app.set('views', __dirname+"/view");

app.set('view cache', false);
swig.setDefaults({cache:false});


app.disable("x-powered-by");
app.use(function(req,res,next){
    res.setHeader("X-Powered-By", "rpg2");
    next();
})

app.use(cookieParse());

app.use('/static', express.static('static'));

app.get('/', function(req,res){
    var param = {
        num:  roll.remainNum(),
        cash: roll.remainCash(),
        top:  roll.remainTop()
    };
    if (req.cookies.key && req.cookies.key.indexOf(sessKey)!=-1) {
        res.render("already_guessed", param);
        return;
    }
    if (param.num==0) res.render("none_left");
    else res.render('index',param); 
});

app.use(bodyParse.urlencoded({extended:true}));

app.post('/roll', function(req,res){
    // check user agent
    if (!uaCheck(req)) {
        res.status(403);
        res.render("good_guy_card");
        return;
    }
    var param = {
        num:  roll.remainNum(),
        cash: roll.remainCash(),
        top:  roll.remainTop()
    };
    if (req.cookies.key && req.cookies.key.indexOf(sessKey)!=-1) {
        res.render("already_guessed", param);
        return;
    }
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
            res.render("already_guessed", param);
        }else{
            var r2 = crypto.pseudoRandomBytes(12).toString("hex");
            res.cookie("key", r2+sessKey, {
                maxAge: 24*60*60*1000, httpOnly:true}
            );
            res.render("guessed", {
                cash: amount
            });
        }
    }
});

app.use(function(req,res){
    res.status(404);
    res.render("404");
});

app.listen(12800);
