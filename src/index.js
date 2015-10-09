#!/usr/bin/env node

var irc = require('irc'),
    config = require('./config'),
    msgListener = require('./lib/messageListener'),
    msgAnnouncer = require('./lib/messageAnnouncer');

var Bot = new irc.Client(
    config.server,
    config.nickname, {
        channels: config.channels,
        debug: false,
        floodProtection: true,
        floodProtectionDelay: 2000
    }
);

// @TODO: Add into config
var standard_messages = [
    {message: "Welcome to Yuri's Revenge Online. Have a crash, or problem playing? Post in our forums at http://cncnet.org/forums to report any bugs!"},
    {message: "Kaboom? Please post your cncnetclient.log found in your game directory at http://cncnet.org/forums"}
];

var toptips_messages = [
    {message: "Did you know, team chat is available in game by typing with Backspace? Chat to everyone in game by typing with Enter"},
    {message: "Commander, Good News! New updates coming soon will include a Red Alert 2 Classic Mode!"},
    {message: "Did you know, it's quicker to deploy your MCV by pressing N, followed by D on your keyboard?"}
];

// Upon the Bot joining the lobby
Bot.addListener('join', function (channel, who) {
    if (who == config.nickname && channel == '#cncnet') {
        // Listen for keywords, and trigger a reply
        msgListener.lobby(Bot);

        // Listen for private messages to bot and trigger a reply
        msgListener.pm(Bot);

        // Begin announcing standard messages to #cncnet
        msgAnnouncer.toAllLobbies(Bot, "#cncnet", standard_messages, 0.3); // 3 minutes

        // Begin timer for announcing top tip messages to #cncnet after a minute of first set
        setTimeout(function () {
            msgAnnouncer.toAllLobbies(Bot, "#cncnet", toptips_messages, 0.6); // 6 minutes
        }, 10000);
    }
});