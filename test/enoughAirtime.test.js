import assert from 'assert';
import enoughAirtime from '../function/enoughAirtime.js';
import { describe, it } from 'node:test';


describe('The enoughAirtime function', function () {
    it('must calculate if a user will have enough airtime based on their projected usage', function () {
        assert.equal('R27.70', enoughAirtime('call,call,call,data,sms,sms,call,data', 50, 0.65, 2.75, 5));
    });

    it('must calculate if a user will have enough airtime based on their projected usage', function () {
        assert.equal('Not enough airtime!', enoughAirtime('data,sms,data,sms', 3, 0.65, 2.75, 5));
    });

    it('must calculate if a user will have enough airtime based on their projected usage', function () {
        assert.equal('R21.00', enoughAirtime('data,data,data', 36, 0.65, 2.75, 5));
    });

});



