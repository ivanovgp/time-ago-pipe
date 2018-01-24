"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
var sinon = require('sinon');
var reflect = require('reflect-metadata');
var time_ago_pipe_1 = require("../time-ago-pipe");
var NgZoneMock = /** @class */ (function () {
    function NgZoneMock() {
    }
    NgZoneMock.prototype.runOutsideAngular = function (fn) {
        return fn();
    };
    NgZoneMock.prototype.run = function (fn) {
        return fn();
    };
    return NgZoneMock;
}());
;
describe('time-ago-pipe', function () {
    var now = new Date();
    var clock;
    var oneSec = 1000;
    var oneMin = oneSec * 60;
    var oneHour = oneMin * 60;
    var oneDay = oneHour * 24;
    var oneMonth = oneDay * 30.416; // approximation 365/12
    beforeEach(function () {
        clock = sinon.useFakeTimers(now.getTime());
    });
    afterEach(function () {
        clock.restore();
    });
    describe('output tests', function () {
        var pipe = new time_ago_pipe_1.TimeAgoPipe(null, new NgZoneMock());
        it('\'a few seconds ago\' tests', function () {
            var pastDate = new Date();
            for (var i = 0; i < 45; i++) {
                clock.tick(oneSec);
                if (i < 44) {
                    expect(pipe.transform(pastDate.toString())).to.equal('a few seconds ago');
                }
            }
        });
        it('\'a minute ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneSec * 45);
            for (var i = 45; i < 89; i++) {
                clock.tick(oneSec);
                if (i < 89) {
                    expect(pipe.transform(pastDate.toString())).to.equal('a minute ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal('a minute ago');
                }
            }
        });
        it('\'x minutes ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneSec * 50);
            for (var i = 1; i < 44; i++) {
                clock.tick(oneMin);
                if (i < 44) {
                    expect(pipe.transform(pastDate.toString())).to.equal(i + 1 + ' minutes ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal(i + 1 + ' minutes ago');
                }
            }
        });
        it('\'an hour ago\' tests', function () {
            var pastDate = new Date();
            //set the time forward 45 mins
            clock.tick(oneMin * 45);
            for (var i = 45; i < 120; i++) {
                clock.tick(oneMin);
                if (i < 90) {
                    expect(pipe.transform(pastDate.toString())).to.equal('an hour ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal('an hour ago');
                }
            }
        });
        it('\'x hours ago\' tests', function () {
            var pastDate = new Date();
            //set the time forward 50 mins
            clock.tick(oneMin * 50);
            for (var i = 1; i < 25; i++) {
                clock.tick(oneHour);
                if (i < 22) {
                    expect(pipe.transform(pastDate.toString())).to.equal(i + 1 + ' hours ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal(i + 1 + ' hours ago');
                }
            }
        });
        it('\'a day ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneHour * 22);
            for (var i = 22; i < 40; i++) {
                clock.tick(oneHour);
                if (i < 36) {
                    expect(pipe.transform(pastDate.toString())).to.equal('a day ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal('a day ago');
                }
            }
        });
        it('\'x days ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneHour * 35);
            for (var i = 1; i < 30; i++) {
                clock.tick(oneDay);
                if (i < 25) {
                    expect(pipe.transform(pastDate.toString())).to.equal(i + 1 + ' days ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal(i + 1 + ' days ago');
                }
            }
        });
        it('\'a month ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneDay * 25);
            for (var i = 25; i < 50; i++) {
                clock.tick(oneDay);
                if (i < 45) {
                    expect(pipe.transform(pastDate.toString())).to.equal('a month ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal('a month ago');
                }
            }
        });
        it('\'x month ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneDay * 43);
            for (var i = 1; i < 13; i++) {
                clock.tick(oneMonth);
                if (i < 10) {
                    expect(pipe.transform(pastDate.toString())).to.equal(i + 1 + ' months ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal(i + 1 + ' months ago');
                }
            }
        });
        it('\'a year ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneDay * 345);
            for (var i = 345; i < 545; i++) {
                clock.tick(oneDay);
                if (i < 545) {
                    expect(pipe.transform(pastDate.toString())).to.equal('a year ago');
                }
                else {
                    expect(pipe.transform(pastDate.toString())).not.to.equal('a year ago');
                }
            }
        });
        it('\'a year ago\' tests', function () {
            var pastDate = new Date();
            clock.tick(oneMonth * 22);
            expect(pipe.transform(pastDate.toString())).to.equal(2 + ' years ago');
            clock.tick(oneMonth * 12);
            expect(pipe.transform(pastDate.toString())).to.equal(3 + ' years ago');
            clock.tick(oneMonth * 36);
            expect(pipe.transform(pastDate.toString())).to.equal(6 + ' years ago');
        });
    });
});
//# sourceMappingURL=time-ago-pipe.spec.js.map