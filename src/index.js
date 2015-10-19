#!/usr/bin/env node

require('irc-colors');

var irc = require('irc'),
    PrivateMessage = require('./lib/PrivateMessage.js'),
    Lobby = require('./lib/Lobby.js'),
    Environment = require('./Environment.js');

var Env = new Environment();

var Bot = new irc.Client(env.server, env.server, {
    debug: true,
    channels: env.channels
});

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
    },
    tips: {
        message_1: "Did you know, team chat is available in game by typing with Backspace? Chat to everyone in game by typing with Enter.",
        message_2: "Did you know, it's quicker to deploy your MCV by pressing N, followed by D on your keyboard?",
        message_3: "Did you know, using the T hotkey whilst selecting a unit will 'select all' units of that type?"
    }
};

// Upon the Bot joining the lobby
Bot.addListener('join', function (channel, who) {
    if (who === Env.nickname && channel === Env.channels) {

        // Ops status
        Bot.send('OPER', Env.username, Env.password);
        Bot.send('samode', Env.channels, '+o', Env.nickname);

        var pmListener = new PrivateMessage(Bot);
        pmListener.reply(message.pm);

        var lobbyListener = new Lobby(Bot);

        lobbyListener.reply(message.lobby);
        lobbyListener.announce(message.announcements);
    }
});