var color = require('irc-colors'),
    msgHandle;

/***
 * Announce to all lobbies after a period of time
 * @type {{toAllLobbies: Function}}
 */

module.exports = {
    toAllLobbies: function (bot, channel, msgs, time) {

        var allMessages = msgs,
            i = 0;

        // cycleHandle can be used to stop interval
        msgHandle = setInterval(function () {

            if (i < allMessages.length) {
                bot.say(channel, color.pink(allMessages[i].message));
            }else if(i >= allMessages.length ){
                i = -1;
            }

            i++; // increase because we want to go to next element
        }, time * 60 * 10000);
    }
};