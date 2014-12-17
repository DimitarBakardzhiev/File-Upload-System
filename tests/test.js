var assert = require("assert");
var encryption = require('../server/utilities/encryption');

// sample test
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
});

describe('Encryption', function () {
    describe('#encryptAndDecrypt', function () {
        it('should return the same plain string after encryption and decryption', function () {
            var text = 'gosholudiq1234';
            var encrypted = encryption.encrypt(text);
            var decrypted = encryption.decrypt(encrypted);

            assert.notEqual(text, encrypted);
            assert.equal(text, decrypted);
        });
    });
});