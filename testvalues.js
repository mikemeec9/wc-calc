var assert = require('assert'),
    wpcalc = require('./wpcalc');

module.exports = {
    'exists()': function() {
        assert.equal(true, wpcalc.exists());
    },

    'scenario1': function() {
        var assets = 1000000, 
            contrib = 20000,
            people = 20,
            percent = 1;
            
        assert.equal(1000, wpcalc.baseFee(assets));
        assert.equal(500, wpcalc.basisPoints(assets));
        assert.equal(375, wpcalc.recordKeeping(people));
        assert.equal(-1000, wpcalc.recordKeepingCredit(assets));
        
        assert.equal(1900, wpcalc.fundExpenses(assets, 19));
        assert.equal(10000, wpcalc.fundExpenses(assets, 100));
        assert.equal(15000, wpcalc.fundExpenses(assets, 150));
        assert.equal(20000, wpcalc.fundExpenses(assets, 200));
        
        assert.equal(6250, wpcalc.wpCostYearN(assets, contrib, people, 1));
        assert.equal(6288, wpcalc.wpCostYearN(assets, contrib, people, 2));
        assert.equal(6326, wpcalc.wpCostYearN(assets, contrib, people, 3));
        assert.equal(6364, wpcalc.wpCostYearN(assets, contrib, people, 4));
        assert.equal(6402, wpcalc.wpCostYearN(assets, contrib, people, 5));
        
        assert.equal(9750, wpcalc.wpCumulativeCost(assets, contrib, people, 1));
        assert.equal(16038, wpcalc.wpCumulativeCost(assets, contrib, people, 2));
        assert.equal(22364, wpcalc.wpCumulativeCost(assets, contrib, people, 3));
        assert.equal(28728, wpcalc.wpCumulativeCost(assets, contrib, people, 4));
        assert.equal(35130, wpcalc.wpCumulativeCost(assets, contrib, people, 5));

        assert.equal(1000000, wpcalc.totalWithAnnual(assets, contrib, 1));
        assert.equal(1020000, wpcalc.totalWithAnnual(assets, contrib, 2));
        assert.equal(1040000, wpcalc.totalWithAnnual(assets, contrib, 3));
        assert.equal(1060000, wpcalc.totalWithAnnual(assets, contrib, 4));
        assert.equal(1080000, wpcalc.totalWithAnnual(assets, contrib, 5));
        
        assert.equal(52000, wpcalc.cumulative5YearCost(assets, contrib, 100));
        assert.equal(78000, wpcalc.cumulative5YearCost(assets, contrib, 150));
        assert.equal(104000, wpcalc.cumulative5YearCost(assets, contrib, 200));
        
        assert.equal(16870, wpcalc.cumulativeSavings(assets, contrib, people, 100));
        assert.equal(42870, wpcalc.cumulativeSavings(assets, contrib, people, 150));
        assert.equal(68870, wpcalc.cumulativeSavings(assets, contrib, people, 200));
    },
    'scenario2': function() {
        var assets = 3000000, 
            contrib = 30000,
            people = 20,
            percent = 1;
            
        assert.equal(4000, wpcalc.baseFee(assets));
        assert.equal(0, wpcalc.basisPoints(assets));
        assert.equal(375, wpcalc.recordKeeping(people));
        assert.equal(-3000, wpcalc.recordKeepingCredit(assets));
        
        assert.equal(5700, wpcalc.fundExpenses(assets, 19));
        assert.equal(30000, wpcalc.fundExpenses(assets, 100));
        assert.equal(45000, wpcalc.fundExpenses(assets, 150));
        assert.equal(60000, wpcalc.fundExpenses(assets, 200));
        
        assert.equal(10550, wpcalc.wpCostYearN(assets, contrib, people, 1));
        assert.equal(10577, wpcalc.wpCostYearN(assets, contrib, people, 2));
        assert.equal(10604, wpcalc.wpCostYearN(assets, contrib, people, 3));
        assert.equal(10631, wpcalc.wpCostYearN(assets, contrib, people, 4));
        assert.equal(10658, wpcalc.wpCostYearN(assets, contrib, people, 5));
        
        assert.equal(14050, wpcalc.wpCumulativeCost(assets, contrib, people, 1));
        assert.equal(24627, wpcalc.wpCumulativeCost(assets, contrib, people, 2));
        assert.equal(35231, wpcalc.wpCumulativeCost(assets, contrib, people, 3));
        assert.equal(45862, wpcalc.wpCumulativeCost(assets, contrib, people, 4));
        assert.equal(56520, wpcalc.wpCumulativeCost(assets, contrib, people, 5));
        
        assert.equal(3000000, wpcalc.totalWithAnnual(assets, contrib, 1));
        assert.equal(3030000, wpcalc.totalWithAnnual(assets, contrib, 2));
        assert.equal(3060000, wpcalc.totalWithAnnual(assets, contrib, 3));
        assert.equal(3090000, wpcalc.totalWithAnnual(assets, contrib, 4));
        assert.equal(3120000, wpcalc.totalWithAnnual(assets, contrib, 5));
        
        assert.equal(96480, wpcalc.cumulativeSavings(assets, contrib, people, 100));
        assert.equal(172980, wpcalc.cumulativeSavings(assets, contrib, people, 150));
        assert.equal(249480, wpcalc.cumulativeSavings(assets, contrib, people, 200));
    }
}