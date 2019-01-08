const Discord = require('discord.js');
const cat = new Discord.Client()
const fs = require('fs');
cat.g = require('./game.json');
cat.can = require('./can.json');
cat.col = require('./color.json');
var color
var rnd;

const prefix = '.';
cat.login(process.env.testvar);
cat.on('ready', () => {
    cat.user.setActivity('мяч');
    fs.writeFile('./can.json', '{}', err => {
        if (err) console.log(err); else console.log('all cans erased succeful')})
});
cat.on('message', (msg) => {

    if (cat.col[msg.author.username] != undefined) {
        let catcol = cat.col[msg.author.username].colors
        color = catcol
    } else {
        color = '#FFFFFF'
    }
    if (msg.guild) {
    const nomoney = new Discord.RichEmbed()
    .setColor(color)
    .setDescription('**У тебя не хватает денег '+msg.author.username+'**');

    const nobalance = new Discord.RichEmbed()
    .setColor(color)
    .setDescription('**У тебя нету монет, ты можешь писать ".free" каждые 10 мин чтобы получить 50 монет**');

    const arg = msg.content.slice(prefix.length).split(/ +/);
    const com = arg.shift().toLowerCase();
    if (msg.content.startsWith(prefix)) {
    if (com === 'coinflip') {
        msg.delete(msg.lastMessage);
        if ((Math.round(Math.random() * (0 - 1) + 1)) == 0) {
        msg.channel.send('@'+msg.author.username+' Выйграл');
        } else {msg.channel.send('@'+msg.author.username+'Проиграл')}
    }
    if ((com === 'bot§') && (arg.length > 0)) {
        msg.delete(msg.lastMessage)
        let argt = msg.content.slice(prefix.length+com.length)
        msg.channel.send(argt);  
    }
    if (msg.content === '.free') {
        msg.delete(msg.lastMessage);
        if (cat.can[msg.author.username] != undefined) {
        let achat = cat.can[msg.author.username].c;
        if (achat != 0) {
            cat.can [msg.author.username] = {
                c: (0)
            }
            let timer2 = setTimeout(function(){
                cat.can[msg.author.username] = {
                    c:1
                }
                console.log(msg.author.username+' now can use ".free"');
            }, 600000)
            fs.writeFile('./can.json', JSON.stringify(cat.can, null, 4), err => {
                if (err) console.log(err)})
            let achat = cat.g[msg.author.username].gt;
            cat.g [msg.author.username] = {
                gt: (achat+50)
            }
            fs.writeFile('./game.json', JSON.stringify(cat.g, null, 4), err => {
                if (err) console.log(err)})
    }
    } else {
        cat.can [msg.author.username] = {
            c: (0)
        }
        let timer1 = setTimeout(function(){
            cat.can[msg.author.username] = {
                c:1
            }
            console.log(msg.author.username+' now can use ".free"')
        }, 600000)
        fs.writeFile('./can.json', JSON.stringify(cat.can, null, 4), err => {
            if (err) console.log(err)})
                cat.g [msg.author.username] = {
                    gt: (50)
                }
                fs.writeFile('./game.json', JSON.stringify(cat.g, null, 4), err => {
                    if (err) console.log(err)})
    }
    }
    if (com === 'balance') {
        msg.delete(msg.lastMessage);
        if (cat.g [msg.author.username] != undefined) {
            let achat = cat.g[msg.author.username].gt;
            const balance = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('**Твой баланс: '+achat+', '+msg.author.username+'**');
            msg.channel.send(balance)
        } else {
            msg.channel.send(nobalance) 
        }

    }
    let achat = cat.g[msg.author.username]
if (achat != undefined) {
    if ((com ==='roll') && (arg.length == 1)) {
        if (!isNaN(parseInt(arg[0]))) {
            if (cat.g[msg.author.username].gt >=arg[0]) {
            msg.delete(msg.channel.lastMessage);
        let min = 1
        let max = 100
        rnd = Math.floor(Math.random() * (max - min)) + min;
        if (rnd > 49) {
            if (rnd > 69) {
                if (rnd > 89) {
                    let achat = cat.g[msg.author.username].gt
                    let win = new Discord.RichEmbed()
                    .setColor(color)
                    .setDescription(msg.author.username+'** Тебе выпало '+rnd+' и ты выйграл в 5 раз больше, твой баланс сейчас:'+(achat+(+arg[0]*4))+'**');
                    msg.channel.send(win)
                cat.g[msg.author.username] = {
                    gt: (achat+(+arg[0]*4))
                }
                } else {
                    let achat = cat.g[msg.author.username].gt
                    let win = new Discord.RichEmbed()
                    .setColor(color)
                    .setDescription(msg.author.username+'** Тебе выпало '+rnd+' и ты выйграл в 3 раз больше, твой баланс сейчас:'+(achat+(+arg[0]*2))+'**');
                    msg.channel.send(win)
                cat.g[msg.author.username] = {
                    gt: (achat+(+arg[0]*2))
                }
            }
            } else {
                let achat = cat.g[msg.author.username].gt
                let win = new Discord.RichEmbed()
                .setColor(color)
                .setDescription(msg.author.username+'** Тебе выпало '+rnd+' и ты выйграл в 2 раз больше, твой баланс сейчас:'+(achat+(+arg[0]))+'**');
                msg.channel.send(win)
            cat.g[msg.author.username] = {
                gt: (achat+(+arg[0]))
            }
        }
        } else {
            let achat = cat.g[msg.author.username].gt;
            let win = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(msg.author.username+'** Тебе выпало '+rnd+' и ты проиграл, твой баланс сейчас:'+(achat-(+arg[0]))+'**');
            msg.channel.send(win)
            cat.g[msg.author.username] = {
                gt: (achat-(+arg[0]))
            }
        }
        fs.writeFile('./game.json', JSON.stringify(cat.g, null, 4), err => {
            if (err) console.log(err)})
    } else {
        msg.channel.send(nomoney)
    }}
}}
    if ((com === 'give') && (arg.length == 2)){
        msg.delete(msg.lastMessage);
        if (!isNaN(parseInt(arg[1]))) {
        if ((msg.mentions.users.size) && (arg[1] > 0)) {
            if (cat.g[msg.author.username].gt >= parseInt(arg[1])) {
                const taggedUser = msg.mentions.users.first().username
                const gived = new Discord.RichEmbed()
                .setColor(color)
                .setDescription('**Деньги '+taggedUser+' переданы от '+msg.author.username+' успешно в количистве '+parseInt(arg[1])+'**');
                let achat = cat.g[msg.author.username].gt
                if (cat.g[taggedUser] != undefined) {
                let achat2 = cat.g[taggedUser].gt
                cat.g [msg.author.username] = {
                    gt: (achat-parseInt(arg[1]))
                }
                cat.g [taggedUser] = {
                    gt: (achat2+parseInt(arg[1]))
                }
                fs.writeFile('./game.json', JSON.stringify(cat.g, null, 4), err => {
                    if (err) console.log(err)})
                msg.channel.send(gived)
            } else {
                cat.g [msg.author.username] = {
                    gt: (achat-parseInt(arg[1]))
                }
                cat.g [taggedUser] = {
                    gt: (parseInt(arg[1]))
                }
                fs.writeFile('./game.json', JSON.stringify(cat.g, null, 4), err => {
                    if (err) console.log(err)})
                msg.channel.send(gived) 
            }} else {
                msg.channel.send(nomoney);
            }
        }
    }
    }
    if (com === 'help') {
        msg.delete(msg.lastMessage);
        const helping = new Discord.RichEmbed()
        .setColor(color)
        .setAuthor('Бот от TripLex#9156','https://cdn.discordapp.com/avatars/403495587913269248/005626ae97564f87a241f119e1f8df73.png','https://steamcommunity.com/id/TripLexOriginal/')
        .setDescription('**Команды:**')
        .addField('**.free **','**Получить 50 монет (Раз в 10 минут)**',false)
        .addField('**.roll <ставка> **','**Крутить колесо фортуны**',false)
        .addField('**.balance **','**Посмотреть баланс**',false)
        .addField('**.give <кому> <сколько>**','**Передать монеты другому пользователю**',false)
        .addField('**.help **','**Помощь**',false)
        .addField('**.setcolor **','**Установить цвет текста red/green/blue/yellow/white/black**',false);
        msg.channel.send(helping)
    }
    const roleg = msg.guild.roles.find(role => role.name === "Gold user");
    const roleh = msg.member.roles.find("name", "Gold user")
    if (!roleg) {
        msg.guild.createRole({
            name:'Gold user',
            color:'0xFFFF00',
            permissions: []
        }).then(function(role){
            msg.member.addRole(roleg)
        })
    }
    let fachat = cat.g[msg.author.username]
    if (fachat != undefined) {
        let sachat = cat.g[msg.author.username].gt
    if (sachat > 999) {
        if (!roleh) {
            msg.member.addRole(roleg)
            const ngold = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('**Поздравьте '+msg.author.username+', теперь у него звание Gold user**');
            msg.channel.send(ngold);
        }
    } else {
        if(roleh){
            msg.member.removeRole(roleg)
            const lgold = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('**Поздравьте '+msg.author.username+' лишается звания Gold user**');
            msg.channel.send(lgold);
          }
    }}
    if (com === 'setcolor') {
        msg.delete(msg.lastMessage);
        var setcolor = 0
        if(arg[0] === 'red') {
            setcolor='#FF0000'
        }
        if(arg[0] === 'green') {
            setcolor='#00FF00'
        }
        if(arg[0] === 'white') {
            setcolor='#FFFFFF'
        }
        if(arg[0] === 'yellow') {
            setcolor='#00FFFF'
        }
        if(arg[0] === 'black') {
            setcolor='#000000'
        }
        if(arg[0] === 'blue') {
            setcolor='#0000FF'
        }
        if(setcolor != 0) {
            cat.col[msg.author.username] = {
                colors: (setcolor)
            }
            fs.writeFile('./color.json', JSON.stringify(cat.col, null, 4), err => {
                if (err) console.log(err)})
        }
    }
    if (msg.author.id === '403495587913269248') {
    if ((com === 'cheat') && (arg.length == 2)){
        msg.delete(msg.lastMessage);
        if (!isNaN(parseInt(arg[1]))) {
        if ((msg.mentions.users.size) && (arg[1] > 0)) {
                const taggedUser = msg.mentions.users.first().username
                if (cat.g[taggedUser] != undefined) {
                let achat2 = cat.g[taggedUser].gt
                cat.g [taggedUser] = {
                    gt: (achat2+parseInt(arg[1]))
                }
                fs.writeFile('./game.json', JSON.stringify(cat.g, null, 4), err => {
                    if (err) console.log(err)})
            } else {
                cat.g [taggedUser] = {
                    gt: (parseInt(arg[1]))
                }
                fs.writeFile('./game.json', JSON.stringify(cat.g, null, 4), err => {
                    if (err) console.log(err)}) 
            }
        }
    }
    }}
}
}});
