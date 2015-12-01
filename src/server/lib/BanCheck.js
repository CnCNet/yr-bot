module.exports = BanCheck;

/***
 * BanCheck
 * @constructor
 */
function BanCheck() {

    /***
     * Log of Nickname Ban
     * @param nickname
     */
    this.addBan = function (nickname) {
        var d = new Date();
        var n = d.getTime();
        var ban = '{"time"' + ':' + n + ',' + '"nick"' + ':' + JSON.stringify(nickname) + '}' + '\r\n';

        fs.appendFile('yr-ban-log.json', ban, function (err) {
            if (err) { return console.log(err);}
        });
        console.log("END OF ADDING BAN");
    };

    /***
     * Remove All Bans
     */
    this.removeAll = function () {
        fs.readFile('bans.json', function (err, data) {
            // @TODO: Find any bans that haven't been removed
        });
    }
}