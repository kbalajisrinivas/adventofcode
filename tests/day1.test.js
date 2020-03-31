const chai = require('chai');
const mockery = require('mockery')
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe("test day1", () => {
    var day1;
    var utils = {
        readFile: () => { }
    };
    beforeEach(function () {
        mockery.enable({
            warnOnUnregistered: false
        });
        mockery.registerMock('./utils', utils);
        day1 = require("../src/day1");
    });

    it('gets fuel for just 1 module', () => {
        utils.readFile = (fileName) => { return ['1969'] }
        let result = day1.getFuelRequired();
        expect(result).to.eql(966);
    });

    it('gets fuel for multiple modules', () => {
        utils.readFile = (fileName) => { return ['12','100'] }
        let result = day1.getFuelRequired();
        expect(result).to.eql(41);
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });
});