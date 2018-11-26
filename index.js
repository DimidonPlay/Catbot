const Discord = require('discord.js');
const cat = new Discord.Client();
var lotok_zasran = 0; 
var lotok_timer = new setInterval(function() { lotok_zasran=lotok_zasran+1 }, 36000);
var lotok_stop = new setTimeout(function() { clearInterval(lotok_timer); msg.channel.send('``` Уважаемые кошки выш лоток засран на 100% ```') }, 3601000);
var lotok_clear

cat.login('NTE2MzE0MDk4NTk0NjExMjAx.Dtx37A.CcH1UM5QNl6d_PGuimlw3YIqASg');
cat.on('message', (msg) => { 
    if (msg.content == '+wash toilet') {
        msg.delete(msg.lastMessage); 
        msg.channel.send('``` +wash toilet | Лоток успешно помыт ```'); 
        lotok_zasran=0;
        lotok_timer = new setInterval(function() { lotok_zasran=lotok_zasran+1 }, 36000);
        lotok_stop = new setTimeout(function() { cleatInterval(lotok_timer) }, 3601000);
    }
    if (msg.content == '+cheek poop') {
        msg.delete(msg.lastMessage);
        msg.channel.send('``` +cheek poop | Процент засранности лотка: '+lotok_zasran+'% ```'); 
    }
    if (msg.content == '+coin flip') {
        if ((Math.round(Math.random() * (0 - 1) + 1)) == 0) {
        msg.channel.send('Выйграл');
        } else {msg.channel.send('Проиграл')}
    }
    lotok_clear = new setTimeout(function() { msg.channel.messages.deleteAll() }, 10000);
});
