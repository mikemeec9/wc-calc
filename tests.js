var assert = require('assert'),
    wpcalc = require('./wpcalc');

module.exports = {
    'exists()': function() {
        assert.equal(true, wpcalc.exists());
    },

    'baseFee_lt3M': function() {
        assert.equal(1000, wpcalc.baseFee(1000));
        assert.equal(1000, wpcalc.baseFee(100000));
        assert.equal(1000, wpcalc.baseFee(1000000));
        assert.equal(1000, wpcalc.baseFee(2000000));
        assert.equal(4000, wpcalc.baseFee(3000000));
        assert.equal(4000, wpcalc.baseFee("3000000"));
        assert.notEqual(1000, wpcalc.baseFee(3000001));
    },

    'baseFee_bw36M': function() {
        assert.notEqual(4000, wpcalc.baseFee(2999999));
        assert.equal(4000, wpcalc.baseFee(3000000));
        assert.equal(4000, wpcalc.baseFee(3000001));
        assert.equal(4000, wpcalc.baseFee(5000000));
        assert.equal(4000, wpcalc.baseFee(5999999));
        assert.equal(4000, wpcalc.baseFee("5999999"));
        assert.notEqual(4000, wpcalc.baseFee(6000000));
    },

    'baseFee_gt6M': function() {
        assert.notEqual(4000, wpcalc.baseFee(6000001));
        assert.equal(5000, wpcalc.baseFee(6000001));
        assert.equal(5000, wpcalc.baseFee(10000000));
    },

    'baseFee_NaN': function() {
        assert.ok(isNaN(wpcalc.baseFee(-1)));
        assert.ok(isNaN(wpcalc.baseFee('asdf')));
        assert.ok(isNaN(wpcalc.baseFee(0)));
    },

    'basisPoints_lt500k': function () {
        assert.equal(0, wpcalc.basisPoints(1));
        assert.equal(0, wpcalc.basisPoints(1000));
        assert.equal(0, wpcalc.basisPoints(500000));
        assert.equal(0, wpcalc.basisPoints("500000"));
        assert.notEqual(0, wpcalc.basisPoints(500001));
        assert.notEqual(0, wpcalc.basisPoints(1000000));
    },

    'basisPoints_bw53M': function() {
        assert.equal(0.001, wpcalc.basisPoints(500001));
        assert.equal(0.5, wpcalc.basisPoints(500500));
        assert.equal(500, wpcalc.basisPoints(1000000));
        assert.equal(1500, wpcalc.basisPoints(2000000));
        assert.equal(2499.999, wpcalc.basisPoints(2999999).toFixed(3));
        assert.equal(2500, Math.round(wpcalc.basisPoints(2999999)));
        assert.equal(779, Math.round(wpcalc.basisPoints(1278867)));
        assert.equal(0, wpcalc.basisPoints(3000000));

    },

    'basisPoints_NaN': function () {
        assert.ok(isNaN(wpcalc.basisPoints(-1)));
        assert.ok(isNaN(wpcalc.basisPoints('asdf')));
        assert.ok(isNaN(wpcalc.basisPoints(0)));
    },

    'baseFee': function() {
        assert.equal(1000, wpcalc.baseFee(wpcalc.totalWithAnnual(1278867, 1, 133779)));
        assert.equal(1000, wpcalc.baseFee(wpcalc.totalWithAnnual(1278867, 2, 133779)));
        assert.equal(1000, wpcalc.baseFee(wpcalc.totalWithAnnual(1278867, 3, 133779)));
        assert.equal(1000, wpcalc.baseFee(wpcalc.totalWithAnnual(1278867, 4, 133779)));
        assert.equal(1000, wpcalc.baseFee(wpcalc.totalWithAnnual(1278867, 5, 133779)));
    },

    'basisPoints': function() {
        assert.equal(779, Math.round(wpcalc.basisPoints(wpcalc.totalWithAnnual(1278867, 1, 133779))));
        assert.equal(913, Math.round(wpcalc.basisPoints(wpcalc.totalWithAnnual(1278867, 2, 133779))));
        assert.equal(1046, Math.round(wpcalc.basisPoints(wpcalc.totalWithAnnual(1278867, 3, 133779))));
        assert.equal(1180, Math.round(wpcalc.basisPoints(wpcalc.totalWithAnnual(1278867, 4, 133779))));
        assert.equal(1314, Math.round(wpcalc.basisPoints(wpcalc.totalWithAnnual(1278867, 5, 133779))));
    },

    'recordKeeping': function() {
        assert.equal(0, wpcalc.recordKeeping(1));
        assert.equal(0, wpcalc.recordKeeping(2));
        assert.equal(0, wpcalc.recordKeeping(15));
        assert.equal(75, wpcalc.recordKeeping(16));
        assert.equal(150, wpcalc.recordKeeping(17));
        assert.equal(375, wpcalc.recordKeeping(20));
        assert.equal(2625, wpcalc.recordKeeping(50));
        assert.equal(2695, wpcalc.recordKeeping(51));
        assert.equal(6125, wpcalc.recordKeeping(100));
        assert.equal(6190, wpcalc.recordKeeping(101));
        assert.equal(12625, wpcalc.recordKeeping(200));
        assert.equal(153350, wpcalc.recordKeeping(2365));
    },

    'recordKeeping_NaN': function() {
        assert.ok(isNaN(wpcalc.recordKeeping(-1)));
        assert.ok(isNaN(wpcalc.recordKeeping('asdf')));
        assert.ok(isNaN(wpcalc.recordKeeping(0)));
    },

    'recordKeepingCredit': function() {
        assert.equal(-10, wpcalc.recordKeepingCredit(wpcalc.totalWithAnnual(10000, 1, 0)));
        assert.equal(-1278.87, wpcalc.recordKeepingCredit(wpcalc.totalWithAnnual(1278867, 1, 133779)).toFixed(2));
    },

    'recordKeepingCredit_NaN': function() {
        assert.ok(isNaN(wpcalc.recordKeepingCredit(-1)));
        assert.ok(isNaN(wpcalc.recordKeepingCredit('asdf')));
        assert.ok(isNaN(wpcalc.recordKeepingCredit(0)));
    },

    'totalWithAnnual': function() {
        assert.equal(1, wpcalc.totalWithAnnual(1, 1, 0));
        assert.equal(1, wpcalc.totalWithAnnual("1", "1", 0));
        assert.equal(1, wpcalc.totalWithAnnual(1, 1, 1));
        assert.equal(2, wpcalc.totalWithAnnual(1, 2, 1));
        assert.equal(2, wpcalc.totalWithAnnual(1, 2, 1));
        assert.equal(3, wpcalc.totalWithAnnual(1, 3, 1));
        assert.equal(4, wpcalc.totalWithAnnual(1, 4, 1));
        assert.equal(5, wpcalc.totalWithAnnual(1, 5, 1));

        assert.equal(5, wpcalc.totalWithAnnual('1', 5, 1));
        assert.equal(5, wpcalc.totalWithAnnual(1, '5', 1));
        assert.equal(5, wpcalc.totalWithAnnual(1, '5', '1'));
    },

    'totalWithAnnual_NaN': function() {
        assert.ok(isNaN(wpcalc.totalWithAnnual(-1)));
        assert.ok(isNaN(wpcalc.totalWithAnnual('asdf')));
        assert.ok(isNaN(wpcalc.totalWithAnnual(1, 'asdf', 0)));
        assert.ok(isNaN(wpcalc.totalWithAnnual(1, 1, 'asdf')));
    },

    'fundExpenses': function() {
        assert.equal(1.9, wpcalc.fundExpenses(1000, 19));
        assert.equal(12.9, wpcalc.fundExpenses(1000, 129));
        assert.equal(10, wpcalc.fundExpenses(1000, 100));
        assert.equal(20, wpcalc.fundExpenses(1000, 200));
    },

    'fundExpenses_NAN': function() {
        assert.ok(isNaN(wpcalc.fundExpenses()));
        assert.ok(isNaN(wpcalc.fundExpenses(1)));
        assert.ok(isNaN(wpcalc.fundExpenses('asdf', 1)));
        assert.ok(isNaN(wpcalc.fundExpenses(1, 'asdf')));
    },

    'firstYearCosts': function() {
        assert.equal(6780, Math.round(wpcalc.firstYear(1278867, 20, 133779, 19)));
        assert.equal(6780, Math.round(wpcalc.firstYear("1278867", "20", "133779", 19)));
    },

    'firstYearCosts_NaN': function() {
        assert.ok(isNaN(wpcalc.firstYear()));
        assert.ok(isNaN(wpcalc.firstYear(1)));
        assert.ok(isNaN(wpcalc.firstYear(1,2)));
        assert.ok(isNaN(wpcalc.firstYear(1,2,3)));
        assert.ok(isNaN(wpcalc.firstYear('asdf',2,3)));
        assert.ok(isNaN(wpcalc.firstYear(1,'asdf',3)));
        assert.ok(isNaN(wpcalc.firstYear(1,2,'asdf')));
    },

    'cumulativeCost': function() {
        assert.equal(12789, wpcalc.cumulativeCost(1278867, 133779, 1, 100));
        assert.equal(12789, wpcalc.cumulativeCost('1278867', 133779, 1, 100));
        assert.equal(12789, wpcalc.cumulativeCost(1278867, '133779', 1, 100));
        assert.equal(12789, wpcalc.cumulativeCost(1278867, 133779, '1', 100));
        assert.equal(12789, wpcalc.cumulativeCost(1278867, 133779, 1, '100'));


        assert.equal(26915, wpcalc.cumulativeCost(1278867, 133779, 2, 100));
        assert.equal(42379, wpcalc.cumulativeCost(1278867, 133779, 3, 100));
        assert.equal(59181, wpcalc.cumulativeCost(1278867, 133779, 4, 100));
        assert.equal(77321, wpcalc.cumulativeCost(1278867, 133779, 5, 100));

        assert.equal(19183, wpcalc.cumulativeCost(1278867, 133779, 1, 150));
        assert.equal(40373, wpcalc.cumulativeCost(1278867, 133779, 2, 150));
        assert.equal(63569, wpcalc.cumulativeCost(1278867, 133779, 3, 150));
        assert.equal(88772, wpcalc.cumulativeCost(1278867, 133779, 4, 150));
        assert.equal(115982, wpcalc.cumulativeCost(1278867, 133779, 5, 150));

        assert.equal(25577, wpcalc.cumulativeCost(1278867, 133779, 1, 200));
        assert.equal(53830, wpcalc.cumulativeCost(1278867, 133779, 2, 200));
        assert.equal(84759, wpcalc.cumulativeCost(1278867, 133779, 3, 200));
        assert.equal(118363, wpcalc.cumulativeCost(1278867, 133779, 4, 200));
        assert.equal(154643, wpcalc.cumulativeCost(1278867, 133779, 5, 200));
    },

    'cumulativeSavings': function() {
        assert.equal(37380, wpcalc.cumulativeSavings('1278867', 133779, 20, 100));
        assert.equal(37380, wpcalc.cumulativeSavings(1278867, '133779', 20, 100));
        assert.equal(37380, wpcalc.cumulativeSavings(1278867, 133779, '20', 100));
        assert.equal(37380, wpcalc.cumulativeSavings(1278867, 133779, 20, '100'));
        assert.equal(37380, wpcalc.cumulativeSavings(1278867, 133779, 20, 100));
        assert.equal(76041, wpcalc.cumulativeSavings(1278867, 133779, 20, 150));
        assert.equal(114702, wpcalc.cumulativeSavings(1278867, 133779, 20, 200));
    },

    'cumulativeSavings_NaN': function() {
        assert.ok(isNaN(wpcalc.cumulativeSavings(1278867)));
        assert.ok(isNaN(wpcalc.cumulativeSavings(1278867, 133779)));
        assert.ok(isNaN(wpcalc.cumulativeSavings(1278867, 133779, 20)));
        assert.ok(isNaN(wpcalc.cumulativeSavings('asdf', 133779, 20, 100)));
        assert.ok(isNaN(wpcalc.cumulativeSavings(1278867, 'asdf', 20, 100)));
        assert.ok(isNaN(wpcalc.cumulativeSavings(1278867, 133779, 'asdf', 100)));
        assert.ok(isNaN(wpcalc.cumulativeSavings(1278867, 133779, 20, 'asdf')));
    },
};