'use strict';

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(-str.length) == str;
    };
}

const chai = require('chai');
const fs = require('fs');

describe("RegExp test", () => {
    const filter_dir = './regexp_filters';
    const filter_dir_files = fs.readdirSync(filter_dir);
    var filters = [];

    for(let i = 0; i < filter_dir_files.length; i++) {
        if(filter_dir_files[i].endsWith('.json')) {
            let filter = require('../' + filter_dir + '/' + filter_dir_files[i]);
            filters.push(filter);
        }
    }

    for(let i = 0; i < filters.length; i++) {
        let regexp = new RegExp(filters[i].regexp_str);
        let should_filter = filters[i].test.should_filter;
        let should_pass = filters[i].test.should_pass;

        it(filters[i].description + " - Type I error", () => {
            for(let j = 0; j < should_pass.length; j++) {
                let test_str = should_pass[j];
                chai.assert.isOk(!regexp.test(test_str),
                                 "Type I error " + test_str);
            }
        });

        it(filters[i].description + " - Type II error", () => {
            for(let j = 0; j < should_filter.length; j++) {
                let test_str = should_filter[j];
                chai.assert.isOk(regexp.test(test_str),
                                 "Type II error " + test_str);
            }
        });
    }
});
