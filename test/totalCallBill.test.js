import assert from 'assert';
import totalCallBill from '../function/totalCallBill.js';
import { describe, it } from 'node:test';




describe('The totalCallBill function' , function(){
    it('calculates the total call bill for the projected usage' , function(){
        assert.equal('R55.00', totalCallBill('call, call, call, call, call, call, call, call, call, call, call, call, call, call, call, call, call, call, call, call', 2.75).totalBill)});
        it('calculates the total call bill for the projected usage' , function(){
        assert.equal('R13.75', totalCallBill('call, call, call, call, call', 2.75).totalBill)});
        it('calculates the total call bill for the projected usage'  , function(){
        assert.equal('R5.50', totalCallBill('call, call', 2.75).totalBill)});
    });