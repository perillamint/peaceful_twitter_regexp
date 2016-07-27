'use strict';

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(-str.length) == str;
    };
}

const fs = require('fs');
const filter_dir = './regexp_filters';
const filter_dir_files = fs.readdirSync(filter_dir);

var filters = [];

for(let i = 0; i < filter_dir_files.length; i++) {
    if(filter_dir_files[i].endsWith(".json")) {
        let filter = require(filter_dir + '/' + filter_dir_files[i]);
        filters.push(filter);
    }
}

let aio_regexp = "(";

for(let i = 0; i < filters.length; i++) {
    aio_regexp += filters[i].regexp_str;

    if(i < filters.length - 1) {
        aio_regexp += '|';
    }
}

aio_regexp += ").*";

console.log("# All-in-One regular expression");
console.log("```");
console.log(aio_regexp);
console.log("```");
