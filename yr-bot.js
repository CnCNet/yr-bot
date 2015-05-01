/**
 * Require a few things to get going
 * @type {exports}
 */
var config = require('./config'),
    init = require('./init'),
    irc = require('irc'),
    announce = require('./repeatMessage');

// Initialise YR BOT
init.start(config, irc);

// Config, Minutes, Message to announce
announce.global(config, 3, "Welcome to Yuri's Revenge Online. If you encounter a problem or crash, please post in our support forums at http://cnc-comm.com/community/");

