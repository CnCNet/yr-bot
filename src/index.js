#!/usr/bin/env node

require('dotenv').config({silent: true});

var irc = require('irc'),
    PrivateMessage = require('./lib/PrivateMessage.js'),
    Lobby = require('./lib/Lobby.js'),
    BanCheck = require('./lib/BanCheck.js');

var server = process.env.SERVER,
    nickname = process.env.NICKNAME,
    channels = process.env.CHANNELS,
    username = process.env.USERNAME,
    password = process.env.PASSWORD;

var Bot = new irc.Client(server, nickname, {
    debug: true,
    channels: [channels]
});

var message = {
    pm: 'If you have a question or need help with your game. Please post in our forums - http://cncnet.org/forums',
    lobby: {
        hello: '"Come to Yuri!" If you need me i\'ll be mind controlling this lobby chat',
        crash: 'Are you having Client or Game crashes? Tell us in our forums at http://cncnet.org/forums',
        kaboom: 'Are you having "Kaboom" trouble? Please post your cncnetclient.log (from your game directory) in our forums at http://cncnet.org/forums',
        help: 'Need help? Please post at our forums http://cncnet.org/forums',
        maps: 'You can add and play Custom maps by copying them into the \'Maps > Custom\' folder found within your game directory.'
    },
    announcements: [
        {"message": "Welcome. Please post any problems at http://cncnet.org/forums Slow game/black screen? Enable TS-DDRAW in Client Options"},
        {"message": "Kaboom or Crashes? Please post your cncnetclient.log found in your game directory at http://cncnet.org/forums"}
    ],
    tips: [
        {"message": "Did you know, team chat is available in game by typing with Backspace? Chat to everyone in game by typing with Enter."},
        {"message": "Maps not showing correctly? Ensure you have NET Framework 4 installed"},
        {"message": "Always remember, Custom maps can be customized to benefit certain starting positions more than others, pick and play your custom maps with care."},
        {"message": "Did you know, it's quicker to deploy your MCV by pressing N, followed by D on your keyboard?"},
        {"message": "Did you know, using the T hotkey whilst selecting a unit will 'select all' units of that type?"},
        {"message": "Don't forget you can team with others in game by pressing tab and selecting next to their name"}
    ]
};

// Upon the Bot joining the lobby
Bot.addListener('join', function (channel, who) {
    if (who === nickname && channel === channels) {

        var bans = new BanCheck();
        bans.removeAll();

        // Ops status
        //Bot.send('OPER', username, password);
        //Bot.send('samode', channels, '+o', nickname);

        var directMessages = new PrivateMessage(Bot);
        var lobby = new Lobby(Bot);

        // Auto reply to direct messages
        directMessages.reply(message.pm);

        // Auto reply to keywords
        lobby.reply(message.lobby, nickname);

        // Auto announce to lobby
        lobby.announce(channels, message.announcements, 0.25, 'pink');
        lobby.announce(channels, message.tips, 0.45, 'blue');
    }
});