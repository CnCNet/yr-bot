module.exports = {


    global: function (config, minutes, message) {
        setInterval(function () {
            yr_bot.say(config.channels[0], color.pink(message));
        }, minutes * 60 * 1000);
    }

};