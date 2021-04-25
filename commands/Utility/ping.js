const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows the latency of the bot.',
    aliases: ['pong', 'pimg'],
    execute(message) {
      let Embed = new Discord.MessageEmbed()
      Embed.setTitle(`Fokushi's Ping`)
      Embed.setDescription(`\`🏓 Latency is ${Date.now() - message.createdTimestamp} ms\``)
      Embed.setTimestamp()
      Embed.setFooter(`Discord is shitty, so the ping may be high due to that. 
Sorry.`)
      Embed.setThumbnail(message.guild.iconURL())
      Embed.setColor("#66b3ff")
  message.channel.send(Embed)
     }
  }