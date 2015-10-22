module.exports = BanCheck;

var fs = require("fs");

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
        var ban = JSON.stringify(nickname);

        fs.writeFile('bans.json', ban, function (err) {
            if (err) throw err;
            console.log('Ban saved!');
        });
    };

    /***
     * Remove All Bans
     */
    this.removeAll = function () {
        fs.readFile('bans.json', function (err, data) {
            // Find any bans that haven't been removed
        });
    }
}