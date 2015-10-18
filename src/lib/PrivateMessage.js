/***
 * PrivateMessage
 * @param bot
 * @constructor
 */
function PrivateMessage(bot) {

    this.reply = function (msg) {
        bot.addListener('pm', function (nick, message) {
            bot.say(nick, 'Hey ' + nick + msg);
        });
    };
}
module.exports = PrivateMessage;