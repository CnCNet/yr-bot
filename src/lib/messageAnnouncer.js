var color = require('irc-colors');

/***
 * Announce to all lobbies after a period of time
 * @type {{toAllLobbies: Function}}
 */

module.exports = {
    toAllLobbies: function (bot, channel, msgs, time) {
        setInterval(function() {
            msgs.forEach(function(msg) {
                bot.say(channel, color.pink(msg.message));
            });
        }, 30000);
    }
};
