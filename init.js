module.exports = {


    start: function (config, irc) {
        var yr_bot = new irc.Client(config.server, config.botName, {
            channels: config.channels
        });
    }

};