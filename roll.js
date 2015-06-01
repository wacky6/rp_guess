"use strict";

var conf = require("./conf");
var fs   = require("fs");

var pool=[];
function cashToStr(cash) {
    return ""+Math.round(cash*100)/100;
}
function poolNum() {
    return pool.length
}
function poolCash() {
    return cashToStr(pool.reduce(function(p,c){return p+c}, 0));
}
function poolTop() {
    return cashToStr(pool.reduce(function(p,c){return Math.max(p,c)}, 0));
}

var log = fs.createWriteStream("./roll.log", {
    flags: "a",
    encoding: "utf-8"
});

var d = new Date();
log.write("================================\n");
log.write("roll initialized at: "+d.toLocaleString()+"\n");

// check conf, initialize pool
conf.forEach(function(e){
    if (e[0] && e[1]) {
        for (var i=0; i!=e[1]; ++i)
            pool.push(e[0]);
    }else{
        throw new Error("Incorrect Configuration!");
    }
});

console.log("initialized pool: "+pool.length+" pockets, "
            +poolCash()
            +" cash in total");

// shuffle pool
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
pool = shuffle(shuffle(pool));

// record alipay accounts
var tab = {}; 

function randInt(max) {
    return Math.floor(Math.random()*max);
}

// return null:   id has already guessed red-pocket
// return Number: will give id a red-pocket with Number CNY
module.exports = {
    remainCash: poolCash,
    remainNum:  poolNum,
    remainTop:  poolTop,
    roll: function(id) {
        // send good-guy-card
        if (tab[id]!==undefined) return null;
        var n    = randInt(pool.length);
        var cash = pool.splice(n,1)[0];
        tab[id] = cash;
        var d   = new Date().toLocaleString();
        var s = d+", name: "+id+", cash: "+cash;
        log.write(d+", "+id+", "+cash+"\n");
        console.log(s);
        return cash;
    }
}
