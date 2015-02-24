express = require('express');
crypto  = require('crypto');
fs      = require('fs');
url     = require('url')
var app = express();
var tab = {};
var pGuess   = fs.readFileSync('guess.html');
var pGuessed = fs.readFileSync('guessed.html');
var pAjax    = fs.readFileSync('ajax3.js');

app.get('/', function(req,res){
    //console.log(req.headers.cookie);
    var id = req.headers.cookie;
    if (!id || !tab[id] || tab[id]==1) { // set id, invite to guess
        crypto.pseudoRandomBytes(8, function(e, b) {
            if (e) {
                res.end('BUSY!');
            }else{
                var sess = 'sess='+b.toString('hex');
                tab[sess] = 1;
                res.status(200);
                if (!id)  res.set('Set-Cookie', sess)
                res.set('Content-Type', 'text/html; charset=UTF-8');
                res.send(pGuess);
            }
        })
    }
    if (tab[id]==2){
        res.status(200);
        res.set('Content-Type', 'text/html; charset=UTF-8');
        res.send(pGuessed);
    }
})
app.get('/submit.do', function(req,res){
    var o = url.parse(req.url, true);
    var p = o.query['payload'];
    if (p) {
        //console.log('payload='+p);
        var sess = req.headers.cookie || 0;
        try {
            var j = JSON.parse(p);
            console.log(j.num+'\t'+j.acc+'\t'+req.headers.cookie+'\t'+req.socket.remoteAddress);
            tab[sess] = 2;
            res.status(200);
            res.end('OK');
        }catch(e){
            console.log('err='+e);
        }
    }
})
app.get('/ajax3.js', function(req,res){
    res.status(200);
    res.set('Content-Type', 'text/javascript');
    res.send(pAjax);
})

app.listen(12800);