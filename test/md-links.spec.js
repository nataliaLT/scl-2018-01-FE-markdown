const assert = require('chai').assert;
global.window = global;
require('../test');

describe('deberia ser un archivo markdown',()=>{
    it('deberia ser md',()=>{
        
    })
})
describe('validar link ', ()=>{
    it('el link esta ok',()=>{
        assert.equal(validar("https://medium.com/@anlijudavid/pasos-para-crear-una-librer%C3%ADa-para-nodejs-fa49b17558b8, ok"), true);
        assert.equal(validar(), false);
        assert.equal(validar(), false);
    })
})