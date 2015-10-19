module.exports = Enviroment;

require('dotenv');

function Enviroment() {
    return {
        server: process.env.SERVER,
        nickname: process.env.NICKNAME,
        channels: process.env.CHANNELS,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    }
}