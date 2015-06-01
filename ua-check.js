"use strict";

var whitelist = [
    "Chrome/",
    "Firefox/",
    "Safari/",
    "Opera/",
    "Chromium/"
];

module.exports = function(req) {
    var flag=false;
    var ua = req.headers['user-agent'];
    if (!ua) return false;
    whitelist.forEach(function(e){
        if (ua.indexOf(e)!==-1) flag=true;
    });
    return flag;
}
