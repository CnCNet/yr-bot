#!/usr/bin/env node

var irc = require('irc'),
    config = require('./config'),
    msgListener = require('./lib/messageListener'),
    msgAnnouncer = require('./lib/messageAnnouncer');

var Bot = new irc.Client(
    config.server,
    config.nickname, {
        channels: config.channels,
        debug: true,
        floodProtection: true,
        floodProtectionDelay: 1000
    }
);

var messages = [
    { message: "Hey Grant-" },
    { message: "Psst Grant-" },
    { message: "Pssssst" },
    { message: "WTF end of the line" }
];

// Upon the Bot joining the lobby
Bot.addListener('join', function (channel, who) {
    console.log('%s has joined %s', who, channel);

    // Listen for keywords, and trigger a reply
    msgListener.lobby(Bot);

    // Listen for private messages to bot and trigger a reply
    msgListener.pm(Bot);

    if (who == config.nickname && channel == '#cncnet') {
        // Announce messages to #cncnet
        msgAnnouncer.toAllLobbies(Bot, "#cncnet", messages, 0.3);
    }
});


Bot.addListener('error', function (message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

Bot.addListener('pm', function (nick, message) {
    console.log('Got private message from %s: %s', nick, message);
});

Bot.addListener('part', function (channel, who, reason) {
    console.log('%s has left %s: %s', who, channel, reason);
});

Bot.addListener('kick', function (channel, who, by, reason) {
    console.log('%s was kicked from %s by %s: %s', who, channel, by, reason);
});
