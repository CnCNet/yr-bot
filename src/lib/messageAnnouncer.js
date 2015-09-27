/***
 *  messageAnnouncer.js
 * @type {{global: Function, bar: Function}}
 */

module.exports = {
    toAllLobbies: function (bot, lobby, msg, time, color) {
        setInterval(function () {
            bot.say(lobby, color.pink(msg));
        }, time * 60 * 10000);
    }
};

