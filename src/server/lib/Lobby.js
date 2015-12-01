module.exports = Lobby;

var color = require('irc-colors');
var BanCheck = require('./BanCheck.js');


/***
 * Lobby
 * @param bot
 * @constructor
 */
function Lobby(bot) {

    /***
     * Reply
     * @param msg
     * @param nickname
     */
    this.reply = function (msg, nickname) {

        var users = [];
        bot.addListener('message', function (from, to, message) {

            checkForFlooding(from, users, message, bot, to);

            if (to.match(/^[#&]/)) {

                if (message.match(/hello/) || message.match(/hi/)) {
                    talk(bot, from, to, msg.hello);
                }

                if (message.match(/kaboom/)) {
                    talk(bot, from, to, msg.kaboom);
                }

                if (message.match(/crash/)) {
                    talk(bot, from, to, msg.crash);
                }

                if (message.match(/help/)) {
                    talk(bot, from, to, msg.help);
                }

                if (message.match(/custom maps/) || message.match(/maps/)) {
                    talk(bot, from, to, msg.maps);
                }
            }
        });
    };

    /***
     * Announce to lobby
     * @param msgs
     * @param time
     */
    this.announce = function (channels, msgs, time, style) {
        var i = 0;

        // Message Handle can be used to stop interval
        setInterval(function () {
            if (i < msgs.length) {
                bot.say(channels, color[style](msgs[i].message));
            } else if (i >= msgs.length) {
                i = -1;
            }
            i++; // increase because we want to go to next message
        }, time * 60 * 10000);
    };
}

/***
 * Check messages for flooding
 * @param obj
 * @param array
 * @param message
 * @param bot
 * @param to
 * @returns {boolean}
 */
function checkForFlooding(obj, array, message, bot, to) {
    var i;

    for (i = 0; i < array.length; i++) {

        // Matches current nick talking in the lobby
        if (array[i].nick === obj) {

            var user = array[i];

            // Increase message count for this nick
            user.count++;

            console.log('User has :', user.count, ' messages and ', user.penalty, ' penalty points');

            // 1 point for talking penalty
            if (user.penalty > 0) {
                user.penalty += 1;
            }

            // 4 Messages within 1.5 seconds
            if (user.penalty > 4 && user.hasTimer) {
                if (user.warned && !user.muted) {

                    // User has ignored warnings, mute.
                    bot.say(to, '"He shall serve me well" Player ' + user.nick + ' has been muted for 15 minutes');
                    user.muted = true;
                    muteUser(user, 0.15, bot);

                } else if (!user.warned) {

                    // User given public warning, last chance before mute.
                    bot.say(to, '"You disturb me?" No flooding please, last warning ' + user.nick);
                    user.warned = true;
                }
            }

            // Penalise even more for a message that's repeated
            if (message === user.msg) {
                user.penalty += 2;
            } else {
                // Update as prev message to match against new
                user.msg = message;
            }

            // Create timer to reduce penalty points
            if (!user.hasTimer) {
                new createTimer(user);
                user.hasTimer = true;
            }
            return true;
        }
    }

    array.push({nick: obj, count: 1, penalty: 1, msg: message, warned: false, hasTimer: false, muted: false});
    return false;
}

/***
 * Create Penalty Timer
 * @param user
 * @returns {number|Object}
 */
var createTimer = function (user) {
    return setTimeout(function () {
        if (user.penalty > 0) {

            while (user.penalty > 0 && user.hasTimer) {
                console.log('Reducing penalty points ...', user.penalty);
                user.penalty -= 1;
                user.count = 0;
                user.hasTimer = false;
            }
        }
    }, 1500);
};

/***
 * Mute User
 * @param user
 * @param time
 * @param bot
 */
var muteUser = function (user, time, bot) {

    var ban = new BanCheck();

    console.log('muting user', user.muted, user);

    if (user.muted) {
        console.log('adding ban to ', user.nick);

        ban.addBan(user.nick);

        bot.send('mode', '#cncnet-yr', '+b', user.nick + '!*@*');

        setTimeout(function () {
            bot.send('mode', '#cncnet-yr', '-b', user.nick + '!*@*');
        }, time * 60 * 10000);
    }
};

/***
 * Talk to lobby
 * @param bot
 * @param to
 * @param message
 */

var canTalk = true;
var talk = function (bot, from, to, message) {

    if (canTalk) {
        bot.say(to, 'Hey ' + from + '! ' + message);
        canTalk = false;
    }

    setTimeout(function () {
        canTalk = true;
    }, 3000);
};