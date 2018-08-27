#! /usr/bin/env node
var path = require('path');
var filename= path.resolve('README.md');
console.log(filename);

const fs = require('fs');

fs.readFile('README.md', 'utf-8', (err,data)=>{
    if(err) throw err;
    console.log(data)
})
