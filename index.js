const Discord = require('discord.js');
const cat = new Discord.Client();
var say_string
var n
var achat
const fs = require('fs');
cat.msgs = require('./chatstory.json');

cat.login('NTE2MzE0MDk4NTk0NjExMjAx.Dtx37A.CcH1UM5QNl6d_PGuimlw3YIqASg');
cat.on('message', (msg) => {
    if (msg.guild.id = '508920768273580053') {
        console.log(msg.guild.id);
    if ((msg.content != '+clear§') && (msg.content.startsWith("+see§") != true)) {
    if (cat.msgs[msg.author.username] != undefined) {
        let achat = cat.msgs[msg.author.username].msg;
        cat.msgs [msg.author.username] = {
            msg: (achat+'`,`'+msg.content)
    } 
    } else {
        cat.msgs [msg.author.username] = {
            msg: ('`'+msg.content) 
    }
    }
    if (msg.author.username != 'CatBot') {
    fs.writeFile('./chatstory.json', JSON.stringify(cat.msgs, null, 4), err => {
        if (err) console.log(err); else console.log('message "'+msg.content+'" saved succeful')
    })}} else {
        if (msg.content.startsWith('+clear§')) {
        cat.msgs = cat.msgs = {
                msg: ('`last clared by '+msg.author.username)
        }
        msg.delete(msg.lastMessage);
        fs.writeFile('./chatstory.json', '{}', err => {
            if (err) console.log(err); else console.log('messages cleared succeful')
        })

        
        /*cat.msgs [msg.author.username] = {
            msg: ('')
        }
        fs.writeFile('./chatstory.json', JSON.stringify(cat.msgs, null, 4), err => {
            if (err) console.log(err) })*/
    } else {

        achat=msg.content;
        msg.delete(msg.lastMessage);
        say_string='';
        for (var n = 0; n != (achat.length - 5); n++) {
            say_string=say_string+achat[5+n];
        };

       console.log(cat.msgs) 
    }}

    if (msg.content == '+coinflip') {
        msg.delete(msg.lastMessage);
        if ((Math.round(Math.random() * (0 - 1) + 1)) == 0) {
        msg.channel.send('Выйграл');
        } else {msg.channel.send('Проиграл')}
    }
    if ((msg.content.startsWith('§bot§')) && (msg.content.length > 5)) {
        achat=msg.content;
        msg.delete(msg.lastMessage);
        say_string='';
        for (var n = 0; n != (achat.length - 5); n++) {
            say_string=say_string+achat[5+n];
        };
        if (msg.member.roles.some(r=>["Кошачий вождь", "Коты модераторы","Администрация"].includes(r.name))) {
            msg.channel.send('**'+say_string+'**');
        } else {
            if (msg.member.roles.some(r=>["Коты няшки", "Просто коты"].includes(r.name))) {
                msg.channel.send('**User | '+say_string+'**');
            }
        }
    }
}
});
