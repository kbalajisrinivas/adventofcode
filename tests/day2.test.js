const chai = require('chai');
const mockery = require('mockery')
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe("test day2", () => {
    var day2;
    var utils = {
        readFile: () => { }
    };
    beforeEach(function () {
        mockery.enable({
            warnOnUnregistered: false
        });
        mockery.registerMock('./utils', utils);
        day2 = require("../src/day2");
    });

    it('get1202ProgramState for 1 set of input', () => {
        utils.readFile = (fileName) => { return ['1,0,0,0'] }
        let result = day2.get1202ProgramState();
        expect(result).to.eql(2);
    });

    it('get1202ProgramState for 1 (multiply) set of input', () => {
        utils.readFile = (fileName) => { return ['1,9,10,3,2,3,11,0,99,30,40,50'] }
        let result = day2.get1202ProgramState();
        expect(result).to.eql(3500);
    });

    it('get1202ProgramState works for actual input', () => {
        utils.readFile = (fileName) => { return ['1,8,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,19,6,23,2,23,6,27,2,6,27,31,2,13,31,35,1,9,35,39,2,10,39,43,1,6,43,47,1,13,47,51,2,6,51,55,2,55,6,59,1,59,5,63,2,9,63,67,1,5,67,71,2,10,71,75,1,6,75,79,1,79,5,83,2,83,10,87,1,9,87,91,1,5,91,95,1,95,6,99,2,10,99,103,1,5,103,107,1,107,6,111,1,5,111,115,2,115,6,119,1,119,6,123,1,123,10,127,1,127,13,131,1,131,2,135,1,135,5,0,99,2,14,0,0'] }
        let result = day2.get1202ProgramState();
        expect(result).to.eql(2241702);
    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });
});