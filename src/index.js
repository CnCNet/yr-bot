#!/usr/bin/env node

require('dotenv').config({silent: true});

var irc = require('irc'),
    logger = require('winston'),
//msgListener = require('./lib/messageListener'),
//msgAnnouncer = require('./lib/messageAnnouncer'),
    PrivateMessage = require('./lib/PrivateMessage.js'),
    Lobby = require('./lib/Lobby.js');


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

var message = {
    pm: 'If you have a question or need help with your game. Please post in our forums - http://cncnet.org/forums',
    lobby: {
        hello: 'Howdy! If you need me i\ll be mind controlling the lobby chat',
        crash: 'Are you having Client or Game crashes? Tell us in our forums at http://cncnet.org/forums',
        kaboom: 'Are you having "Kaboom" trouble? Please post your cncnetclient.log (from your game directory) in our forums at http://cncnet.org/forums',
        help: 'Need help? Please post at our forums http://cncnet.org/forums',
        maps: 'You can add and play Custom maps by copying them into the \'Maps > Custom\' folder found within your game directory.'
    },
    announcements: {
        message_1: "Welcome. Please post any problems at http://cncnet.org/forums Slow game/black screen? Enable TS-DDRAW in Client Options",
        message_2: "Kaboom or Crashes? Please post your cncnetclient.log found in your game directory at http://cncnet.org/forums",
        message_3: "Maps not showing correctly? Ensure you have NET Framework 4 installed",
        message_4: "Always remember, Custom maps can be customized to benefit certain starting positions more than others, pick and play your custom maps with care."
    }
};


// Upon the Bot joining the lobby
Bot.addListener('join', function (channel, who) {
    if (who == nickname && channel == channels) {

        // Ops status
        //Bot.send('OPER', username, password);
        //Bot.send('samode', channels, '+o', nickname);

        // Listen for keywords, and trigger a reply
        //msgListener.lobby(Bot);

        // Listen for private messages to bot and trigger a reply
        //msgListener.pm(Bot);

        var pmListener = new PrivateMessage(Bot);
        pmListener.reply(message.pm);

        var lobbyListener = new Lobby(Bot);
        lobbyListener.reply(message.lobby);
        lobbyListener.announce(message.announcements);

        // Begin announcing standard messages to #cncnet
        //msgAnnouncer.toAllLobbies(Bot, channels, standard_messages, 0.2); // 2 minutes

        //setTimeout(function () {
        //    msgAnnouncer.toAllLobbies(Bot, channels, toptips_messages, 0.4); // 4 minutes
        //}, 0.55 * 60 * 10000);
    }
});