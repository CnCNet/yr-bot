/***
 *  messageAnnouncer.js
 * @type {{global: Function, bar: Function}}
 */
module.exports = {
    toAllLobbies: function (bot, lobby, msg, time) {
        setInterval(function () {
            bot.say(lobby, msg);
        }, time * 60 * 10000);
    }
};

