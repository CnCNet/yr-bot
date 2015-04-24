/***
 * Configure settings for bot
 * @type {{channels: string[], server: string, botName: string, repeatMsg: string}}
 */
var config = {
        channels: ["#yr"],
        server: "irc.cncnet.org",
        botName: "test-",
        repeatMsg: "Hello"
    },
    irc = require('irc'),
    color = require('irc-colors'),
    minutes = 5,
    the_interval = minutes * 60 * 1000;

/**
 * YR Bot
 * @type {exports.Client}
 */
var yr_bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});

/**
 * Repeat message globally every x minutes
 * @see var minutes
 */
setInterval(function () {
    yr_bot.say(config.channels[0], color.pink(config.repeatMsg));
}, the_interval);