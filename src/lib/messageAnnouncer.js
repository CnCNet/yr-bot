var color = require('irc-colors');

/***
 * Announce to all lobbies after a period of time
 * @type {{toAllLobbies: Function}}
 */

module.exports = {
    toAllLobbies: function (bot, channel, msg, time) {
        setInterval(function () {
            msg.forEach(function (value) {
                bot.say(channel, color.pink(value.message));
            });
        }, time * 60 * 10000);
    }
};