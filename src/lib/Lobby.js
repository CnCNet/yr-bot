module.exports = Lobby;

/***
 * Lobby
 * @param bot
 * @constructor
 */
function Lobby(bot) {
    this.reply = function (msg) {

        var users = [];

        bot.addListener('message', function (from, to, message) {

            checkForFlooding(from, users, message, bot, to);

            if (to.match(/^[#&]/)) {

                if (message.match(/hello/) || message.match(/hi/)) {
                    bot.say(to, msg.hello);
                }

                if (message.match(/kaboom/)) {
                    bot.say(to, 'Hey ' + from + '! ' + msg.kaboom);
                }

                if (message.match(/crash/)) {
                    bot.say(to, 'Hey ' + from + '! ' + msg.crash);
                }

                if (message.match(/help/) && canTalk) {
                    bot.say(to, 'Hey ' + from + '! ' + msg.help);
                }

                if (message.match(/custom maps/) || message.match(/maps/)) {
                    bot.say(to, 'Hey ' + from + '! ' + msg.maps);
                }
            }
        });
    };

    // @TODO
    this.announce = function () {
        var allMessages = msgs,
            i = 0,
            timeHandle;

        // Message Handle can be used to stop interval
        timeHandle = setInterval(function () {
            if (i < allMessages.length) {
                bot.say(channel, color.pink(allMessages[i].message));
            } else if (i >= allMessages.length) {
                i = -1;
            }
            i++; // increase because we want to go to next message
        }, time * 60 * 10000);
    }
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
                    muteUser(user.nick, 0.15, bot);

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

    if (user.muted) {
        console.log('Muting player' + user.nick);
        //bot.send('mode', '#cncnet-yr', '+b', user.nick + '!*@*');

        setTimeout(function () {
            console.log('Un-muting player' + user.nick);
            //bot.send('mode', '#cncnet-yr', '-b', user.nick + '!*@*');
        }, time * 60 * 10000);
    }

};


