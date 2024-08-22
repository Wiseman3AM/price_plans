import assert from 'assert';
import totalSmsBill from '../function/totalSmsBill.js';
import { describe, it } from 'node:test';




describe('The totalSmsBill function' , function(){
    it('calculates the total sms bill for the projected usage' , function(){
        assert.equal('R3.25', totalSmsBill('sms, sms, sms, sms, sms', 0.65).totalBill)});
        it('calculates the total sms bill for the projected usage' , function(){
        assert.equal('R1.95', totalSmsBill('sms, sms, sms', 0.65).totalBill)});
        it('calculates the total sms bill for the projected usage'  , function(){
        assert.equal('R4.00', totalSmsBill('sms, sms', 2).totalBill)});
    });