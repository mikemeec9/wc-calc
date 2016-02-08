
/*jshint strict: true */
/*global define: true, jQuery: false */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require, exports, module) {

    "use strict";

    exports.exists = function () {
        return true;
    };

    exports.baseFee = function (amount) {
        var fee = NaN,
            million = 1000000;
        if (isFinite(String(amount)) && amount > 0) {
            if (amount <= 3 * million) {
                fee = 1000;
            } else if (amount <= 6 * million) {
                fee = 4000;
            } else if (amount > 6 * million) {
                fee = 5000;
            }
        }
        return fee;
    };

    exports.basisPoints = function (amount) {
        var points = NaN,
            million = 1000000;
        if (isFinite(String(amount)) && amount > 0) {
            if (amount <= (million / 2)) {
                points = 0;
            } else if (amount > (million / 2) && amount < 3 * million) {
                points = 0.001 * (amount - (million / 2));
            } else if (amount >= million * 3) {
                points = 0;
            }
        }
        return points;
    };

    exports.recordKeeping = function (userCount) {
        var cost = NaN;
        if (isFinite(String(userCount)) && userCount > 0) {
            if (userCount <= 15) {
                cost = 0;
            } else if (userCount <= 50) {
                cost = (userCount - 15) * 75;
            } else if (userCount <= 100) {
                cost = 2625 + (userCount - 50) * 70;
            } else {
                cost = 6125 + (userCount - 100) * 65;
            }
        }
        return cost;
    };

    exports.recordKeepingCredit = function (assets) {
        var credit = NaN;
        if (isFinite(String(assets)) && assets > 0) {
            credit = -0.001 * assets;
        }
        return credit;
    };

    exports.totalWithAnnual = function (assets, year, deposit) {
        var total = NaN;
        if (isFinite(String(assets)) && assets > 0 &&
                isFinite(String(year)) && year > 0 &&
                isFinite(String(deposit)) && deposit >= 0) {
            total = (year - 1) * deposit + Number(assets);
        }
        return total;
    };

    exports.fundExpenses = function (assets, points) {
        var total = NaN;
        if (isFinite(String(assets)) && assets > 0 &&
                isFinite(String(points)) && points > 0) {
            total = points * assets / 10000;
        }
        return total;
    };

    exports.firstYear = function (assets, userCount, deposit, points) {
        var total = NaN, totalAssets;
        if (isFinite(String(assets)) && assets > 0 &&
                isFinite(String(userCount)) && userCount > 0 &&
                isFinite(String(deposit)) && deposit >= 0 &&
                isFinite(String(points)) && points >= 0) {
            totalAssets = exports.totalWithAnnual(assets, 1, deposit);
            total = exports.baseFee(totalAssets) +
                    exports.basisPoints(totalAssets) +
                    3475 +
                    exports.recordKeeping(userCount) +
                    exports.recordKeepingCredit(totalAssets) +
                    exports.fundExpenses(totalAssets, points);
        }
        return total;
    };

    exports.cumulativeCost = function (assets, deposit, year, points) {
        var total = NaN,
            i;
        if (isFinite(String(assets)) && assets > 0 &&
                isFinite(String(deposit)) && deposit >= 0 &&
                isFinite(String(year)) && year >= 0 &&
                isFinite(String(points)) && points >= 0) {
            total = 0;
            for (i = 0; i < year; i += 1) {
                total += (points / 10000) * ((i * deposit) + Number(assets));
            }
        }
        return Math.round(total);
    };

    exports.cumulativeSavings = function (assets, deposit, userCount, points) {
        var total = NaN,
            wpPoints = 19,
            year;
        if (isFinite(String(assets)) && assets > 0 &&
                isFinite(String(deposit)) && deposit >= 0 &&
                isFinite(String(userCount) && userCount > 0) &&
                isFinite(String(points)) && points >= 0) {
            total = 3500;
            for (year = 1; year <= 5; year += 1) {
                total += exports.firstYear(exports.totalWithAnnual(assets, year, deposit), userCount, 0, wpPoints);
            }
        }
        return Math.round(exports.cumulativeCost(assets, deposit, 5, points) - total);
    };

    // http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    Number.prototype.formatMoney = function (c, d, t) {
        var n = this, i, j, s;
        c = isNaN(c = Math.abs(c)) ? 2 : c;
        d = d === undefined ? "." : d;
        t = t === undefined ? "," : t;
        s = n < 0 ? "-" : "";
        i = String(parseInt(n = Math.abs(+n || 0).toFixed(c), 10));
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    exports.updatePage = function (assets, userCount, deposits) {
        var $ = jQuery,
            f_assets = $("#assets").val().replace(/[$,]+/g, ""),
            f_participants = parseInt($("#participants").val(), 10),
            f_deposits = $("#deposits").val().replace(/[$,]+/g, ""),
            f_planfees = parseFloat($("#planfees").val().replace(/[$,]+/g, "")),
            f_planfeesp = parseFloat($("#planfeesp").val()),
            year1cost = Math.round(exports.firstYear(f_assets, f_participants, f_deposits, 19));

        if (!isFinite(String(f_planfees)) && isFinite(String(f_planfeesp))) {
            f_planfees = f_assets * f_planfeesp / 100;
        } else if (isFinite(String(f_planfees)) && !isFinite(String(f_planfeesp))) {
            f_planfeesp = (f_planfees / f_assets * 100).toFixed(2);
        } else if (isFinite(String(f_planfees)) && isFinite(String(f_planfeesp))) {
            f_planfeesp = (f_planfees / f_assets * 100).toFixed(2);
        } else {
//            f_planfeesp = 2.5;
//            f_planfees = f_assets * f_planfeesp / 100;
            f_planfees = f_planfeesp = "";
        }

        f_planfees = Math.round(f_planfees);
        $("#planfees").val(f_planfees);
        $("#planfeesp").val(f_planfeesp);

        $(".year1cost").text(year1cost.formatMoney(0));
        $(".year1costp").text((100 * year1cost / f_assets).toFixed(2));
        $(".year1current").text(f_planfees.formatMoney(0));
        $(".year1currentp").text((100 * f_planfees / f_assets).toFixed(2));

        $(".year1cost100").text(((100 * f_assets) / 10000).formatMoney(0));
        $(".year1cost150").text(((150 * f_assets) / 10000).formatMoney(0));
        $(".year1cost200").text(((200 * f_assets) / 10000).formatMoney(0));


        $(".year1save").text(exports.cumulativeSavings(f_assets, f_deposits, f_participants, 100 * f_planfeesp).formatMoney(0));
        $(".year5save100").text(exports.cumulativeSavings(f_assets, f_deposits, f_participants, 100).formatMoney(0));
        $(".year5save150").text(exports.cumulativeSavings(f_assets, f_deposits, f_participants, 150).formatMoney(0));
        $(".year5save200").text(exports.cumulativeSavings(f_assets, f_deposits, f_participants, 200).formatMoney(0));

        /*
        1.  if total current plan fees <= 0.4 then message A
        2.  0.4<if total current fees<=0.85 then message B
        3.  0.85<total current fees<=1.2 then message C
        4.  If Total current fees >1.2 then message D
        */
        $("#messageA").hide();
        $("#messageB").hide();
        $("#messageC").hide();
        $("#messageD").hide();
        $("#messageE").hide();

        if (!isNaN(f_planfeesp)) {
            if (f_planfeesp <= 0.4) {
                $("#messageA").show();
            } else if (f_planfeesp <= 0.85) {
                $("#messageB").show();
            } else if (f_planfeesp <= 1.25) {
                $("#messageC").show();
            } else if (f_planfeesp > 1.2) {
                $("#messageD").show();
            } else {
                $("#messageE").show();
                $("#resultstable").hide();
            }
        }
	};
});