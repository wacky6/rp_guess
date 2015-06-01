"use strcit";

module.exports = function(id) {
    var reMail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var rePhone = /^[0-9]{11}$/;
    return reMail.test(id) || rePhone.test(id);
}
