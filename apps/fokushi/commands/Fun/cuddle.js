const Discord = require('discord.js');
const gif = require('nekos.life');
const neko = new gif;
module.exports = {
    name: 'cuddle',
    description: 'Lets you cuddle someone.',
    async execute(message, args) {
        var user = message.mentions.users.first();
        const cuddle = await neko.sfw.cuddle();
        var url = cuddle[Math.floor(Math.random() * cuddle.length)];
        console.log(url)
        let embed = new Discord.MessageEmbed();
        embed.setColor('RANDOM')
        embed.setDescription(`**${user}** was cuddled by **${message.member}**`)
        embed.setImage(cuddle.url)
        message.channel.send(embed)
    }
}