/***
 *  messageAnnouncer.js
 * @type {{global: Function, bar: Function}}
 */

module.exports = {
    toAllLobbies: function (bot, lobby, msg, time) {
        setTimeout(function () {
            bot.say(lobby, msg);
        }, time);
    }
};