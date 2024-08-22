import assert from 'assert';
import totalDataBill from '../function/totalDataBill.js';
import { describe, it } from 'node:test';




describe('The totalDataBill function' , function(){
    it('calculates the total data bill for the projected usage' , function(){
        assert.equal('R15.00', totalDataBill('data, data, data', 5.00).totalBill)});
        it('calculates the total data bill for the projected usage', function(){
        assert.equal('R25.00', totalDataBill('data, data, data, data, data', 5.00).totalBill)});
        it('calculates the total data bill for the projected usage' , function(){
        assert.equal('R5.00', totalDataBill('data', 5.00).totalBill)});
    });