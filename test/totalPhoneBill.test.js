import assert from 'assert';
import totalPhoneBill from '../function/totalPhoneBill.js';
import { describe, it } from 'node:test';




describe('The toatlPhoneBill functiomn' , function(){
    it('calculates the total bill for the projected usage using the following.' , function(){
        assert.equal('R12.45', totalPhoneBill('call, sms, call, sms, sms, data', 0.65, 2.75, 5.00))});
        it('Calculates the total bill for the data provided.' , function(){
        assert.equal('R8.40', totalPhoneBill('call, sms, data', 0.65, 2.75, 5.00))});
        it('Calculates the total bill for the data provided.' , function(){
        assert.equal('R11.30', totalPhoneBill('sms, sms, data, data', 0.65, 2.75, 5.00))});
    });