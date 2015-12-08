# Yuri's Revenge Channel Bot

A simple nodejs application to have a bot appear in the cncnet irc channel.

### Main aims
- To announce a customizable message to a channel.
- Ability to edit the message without disconnecting from a channel.
- Ability to add/remove a list of messages to be announced. 
- Change message in a simple and secure web interface. 
- Configure bot to respond to direct messages.
- Configure bot to listen to certain keywords and trigger a response.

##Installation

* Run in the command line: `npm install`
* Launch by running `pm2 start src/client/bot.js`

##License 

The MIT License

Copyright (c) 2015 CnCNet. http://cncnet.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
