var logger = require('winston'),
    canTalk = true,
    canDance = true,
    users = [];

/***
 * messageListener.js
 * @type {{lobby: Function, pm: Function}}
 */

module.exports = {
    lobby: function (bot) {
        bot.addListener('message', function (from, to, message) {

            checkForFlooding(from, users);

            if (to.match(/^[#&]/)) {

                if (message.match(/kaboom/) && canTalk) {
                    bot.say(to, 'Hey ' + from + '! Are you having "Kaboom" trouble? Please post your cncnetclient.log (from your game directory) in our forums at http://cncnet.org/forums');
                    pauseChat(20000);
                }

                if (message.match(/crash/) && canTalk) {
                    bot.say(to, 'Hey ' + from + '! Are you having "Kaboom" trouble? Please post your cncnetclient.log (from your game directory) in our forums at http://cncnet.org/forums');
                    pauseChat(20000);
                }

                if (message.match(/help/) && canTalk) {
                    bot.say(to, 'Hey ' + from + '! Need help? Please post at our forums http://cncnet.org/forums');
                    pauseChat(20000);
                }

                if (message.match(/custom maps/) || message.match(/maps/) && canTalk) {
                    bot.say(to, 'You can add and play Custom maps by copying them into the \'Maps > Custom\' folder found within your game directory.');
                    pauseChat(20000);
                }

                if (message.match(/dance/) && canDance) {
                    logger.info(from + ' found the easteregg');
                    bot.say(to, from + ' Fool. You can\'t control me!');

                    setTimeout(function () {
                        bot.say(to, '\u0001ACTION dances: :D\\-<\u0001');
                    }, 2000);
                    setTimeout(function () {
                        bot.say(to, '\u0001ACTION dances: :D|-<\u0001');
                    }, 3000);
                    setTimeout(function () {
                        bot.say(to, '\u0001ACTION dances: :D/-<\u0001');
                    }, 4000);
                    setTimeout(function () {
                        bot.say(to, '\u0001ACTION dances: :D|-<\u0001');
                    }, 5000);

                    // That's enough dancing for now
                    pauseDancing(50000);

                } else if (message.match(/dance/) && !canDance) {
                    bot.say(to, 'I cannot be overcome');
                }
            }

            logger.info(from + message);
        });
    },
    pm: function (bot) {
        bot.addListener('pm', function (nick, message) {
            if (canTalk) {
                logger.info('pm received:' + nick + message);
                bot.say(nick, 'Hey ' + nick + '. Need help? Please post in our forums at http://cncnet.org/forums and one of my comrades will assist!');
                pauseChat(2000);
            }
        });
    }
};


/***
 * Check messages for Flooding
 * @param obj
 * @param array
 * @returns {boolean}
 */
function checkForFlooding(obj, array) {
    var i;

    for (i = 0; i < array.length; i++) {

        // Matches current nick talking
        if (array[i].nick === obj) {

            // Increase message count for this nick
            array[i].count++;

            // Increase penalty
            if (array[i].penalty >= 0) {
                array[i].penalty += 1;
                console.log(array[i].penalty);
            }

            // If there has been 3 messages within 1.6 seconds
            if (array[i].count > 3 && array[i].penalty > 3) {
                console.log(array[i].nick, ' kicked for flooding');
            }

            // Decrease penalty, they've been good.
            setTimeout(function () {
                console.log('Reducing penalty for', array[i].nick);
                if (array[i].penalty > 0) {
                    array[i].penalty -= 1;
                }
            }, 1600);

            console.log('Penalty count: ', array[i].penalty);
            return true;
        }
    }

    users.push({nick: obj, count: 1, penalty: 1});
    return false;
}

// @TODO: These two functions are the same, combine

/***
 * Pause Chat
 */

var pauseChat = function (time) {
    canTalk = false;

    setTimeout(function () {
        canTalk = true;
    }, time);
};

/***
 * When the Bot has embarrassed its self enough...
 */
var pauseDancing = function (time) {
    canDance = false;

    setTimeout(function () {
        canDance = true;
    }, time);
};