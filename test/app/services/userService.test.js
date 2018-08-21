var expect = require('expect');

describe("UserService.js", () => {
    it('It should add numbers', () => {
        var res = 2+2;
        assert.equal(res,7);
    });

    it('It should devide numbers', () => {
        var res = 2/2;
        expect(res).to.eql(1);
    });
    it('It should compare objects', () => {
    expect({name:"ajay"}).to.matches({name:"ajay"});
    var res = 2/2;
    });
});