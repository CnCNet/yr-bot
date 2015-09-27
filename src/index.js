#!/usr/bin/env node

var irc = require('irc'),
    config = require('./config.json'),

    Bot = new irc.Client(config.server, config.name, {
        channels: config.channels
    }),

    msgListener = require('./lib/messageListener'),
    msgAnnouncer = require('./lib/messageAnnouncer');

// Listen for keywords, and trigger a reply
msgListener.lobby(Bot);

// Listen for private messages to bot and trigger a reply
msgListener.pm(Bot);

// Auto announce message to lobbies
// @TODO: Read from a database, and update via a UI
msgAnnouncer.toAllLobbies(Bot, "#cncnet", "Welcome. Please post any problems at http://cncnet.org/forums. Slow game/black screen? Enable TS-DDRAW in Client Options", 30000);