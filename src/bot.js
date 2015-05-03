/***
 * Configure settings for Bot
 * @type {json} {channels: string[], server: string, name: string, repeat: object[]}
 */
var config = require(__dirname + '/config.json');
var irc = require('irc');
var color = require('irc-colors');

/**
 * Bot
 * @type {exports.Client}
 */
var Bot = new irc.Client(config.server, config.name, {
    channels: config.channels
});

Bot.announce = function(target, message) {
    if (typeof target == 'string') target.split();
    for(var i = 0; i < target.length; i++) {
        Bot.say(target[i], message[i]);
    }
}

/**
 * Repeat message globally every x minutes
 * @see var minutes
 */
if (config.repeat) {
    for(var i = 0; i < config.repeat.length; i++) {
        var entry = config.repeat[i];
        setInterval(function () {
            Bot.announce(entry.channels, color.pink(entry.message));
        }, entry.interval * 60 * 1000);
    }
}
