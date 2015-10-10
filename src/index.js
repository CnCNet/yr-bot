#!/usr/bin/env node

require('dotenv').config({silent: true});

var irc = require('irc'),
    msgListener = require('./lib/messageListener'),
    msgAnnouncer = require('./lib/messageAnnouncer');

var server = process.env.SERVER,
    nickname = process.env.NICKNAME,
    channels = process.env.CHANNELS,
    username = process.env.USERNAME,
    password = process.env.PASSWORD;

var Bot = new irc.Client(server, nickname, {
    debug: false,
    channels: [channels]
});

// TODO: Add into config
var standard_messages = [
    {message: "Welcome. Please post any problems at http://cncnet.org/forums Slow game/black screen? Enable TS-DDRAW in Client Options"},
    {message: "Kaboom or Crashes? Please post your cncnetclient.log found in your game directory at http://cncnet.org/forums"},
    {message: "Maps not showing correctly? Ensure you have NET Framework 4 installed"},
    {message: "Commanders, don't be fooled. Remember not all custom maps are fair. Some have advantages only visible to one player, such as hidden bases for example."}
];

var toptips_messages = [
    {message: "Did you know, team chat is available in game by typing with Backspace? Chat to everyone in game by typing with Enter."},
    {message: "Did you know, it's quicker to deploy your MCV by pressing N, followed by D on your keyboard?"},
    {message: "Did you know, using the T hotkey whilst selecting a unit will 'select all' units of that type?"}
];

// Upon the Bot joining the lobby
Bot.addListener('join', function (channel, who) {
    if (who == nickname && channel == channels) {

        // Ops status
        Bot.send('OPER', username, password);
        Bot.send('samode', channels, '+o', nickname);

        // Listen for keywords, and trigger a reply
        msgListener.lobby(Bot);

        // Listen for private messages to bot and trigger a reply
        msgListener.pm(Bot);

        // Begin announcing standard messages to #cncnet
        msgAnnouncer.toAllLobbies(Bot, channels, standard_messages, 0.2); // 3 minutes

        setTimeout(function () {
            msgAnnouncer.toAllLobbies(Bot, channels, toptips_messages, 0.4); // 6 minutes
        }, 0.55 * 60 * 10000);
    }
});