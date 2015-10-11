#!/usr/bin/env node

require('dotenv').config({silent: true});

var irc = require('irc'),
    logger = require('winston'),
    msgListener = require('./lib/messageListener'),
    msgAnnouncer = require('./lib/messageAnnouncer');

var server = process.env.SERVER,
    nickname = process.env.NICKNAME,
    channels = process.env.CHANNELS,
    username = process.env.USERNAME,
    password = process.env.PASSWORD;

var Bot = new irc.Client(server, nickname, {
    debug: true,
    channels: [channels]
});

// TODO: Add into config
var standard_messages = [
    {message: "Welcome. Please post any problems at http://cncnet.org/forums Slow game/black screen? Enable TS-DDRAW in Client Options"},
    {message: "Kaboom or Crashes? Please post your cncnetclient.log found in your game directory at http://cncnet.org/forums"},
    {message: "Maps not showing correctly? Ensure you have NET Framework 4 installed"},
    {message: "Always remember, Custom maps can be customized to benefit certain starting positions more than others, pick and play your custom maps with care."}
];

var toptips_messages = [
    {message: "Did you know, team chat is available in game by typing with Backspace? Chat to everyone in game by typing with Enter."},
    {message: "Did you know, it's quicker to deploy your MCV by pressing N, followed by D on your keyboard?"},
    {message: "Did you know, using the T hotkey whilst selecting a unit will 'select all' units of that type?"}
];


logger.add(logger.transports.File, {filename: 'cncnet-yr-chatlog.log'});
logger.remove(logger.transports.Console);


// Upon the Bot joining the lobby
Bot.addListener('join', function (channel, who) {
    if (who == nickname && channel == channels) {

        logger.info(who + ' joined ' + channel);

        // Ops status
        Bot.send('OPER', username, password);
        Bot.send('samode', channels, '+o', nickname);

        logger.info(who + ' is now an operator on ' + channel);

        // Listen for keywords, and trigger a reply
        msgListener.lobby(Bot);

        // Listen for private messages to bot and trigger a reply
        msgListener.pm(Bot);

        // Begin announcing standard messages to #cncnet
        msgAnnouncer.toAllLobbies(Bot, channels, standard_messages, 0.2); // 2 minutes

        setTimeout(function () {
            msgAnnouncer.toAllLobbies(Bot, channels, toptips_messages, 0.4); // 4 minutes
        }, 0.55 * 60 * 10000);
    }
});