var moment = require('moment');

module.exports.now = function now(){
    let regEx = /(\d{4})-(\d{2})-(\d{2})T(\d+):(\d+):(\d+)/;
    let x = moment().format().match(regEx);
    let date = x.slice(1,4).join("-");
    let time = x.slice(4).join(":");
    let dateTime = date+" "+time;
    return dateTime;
}