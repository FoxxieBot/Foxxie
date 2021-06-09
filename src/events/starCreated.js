const { Event, bold, LINK_REGEX: { ruff, imgur, discord } } = require('foxxie');
const { MessageEmbed } = require('discord.js');
const { emojis: { starboard: { tier0, tier1, tier2, tier3 } }, color: { TCS_STARBOARD } } = require('../../lib/util/constants');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            event: 'starCreated'
        })
    }

    async run(reaction, user, guild, { channel, minimum }) {

        const { language } = guild;
        let embedEmoji = await this.getEmoji(reaction);
        const notification = await guild.settings.get('starboard.notifications');

        const embed = new MessageEmbed()
                .setTitle(reaction.message.author.tag)
                .setColor(guild.id === '761512748898844702' ? TCS_STARBOARD : reaction.message.member.displayColor)
                .setImage(reaction.message.attachments.size > 0  ? reaction.message.attachments.array()[0].url : '')
                .setDescription(`\n${reaction.message.content ? reaction.message.content : ''}\n\n${
                    embedEmoji
                } ${bold`${reaction.count}`} | ${reaction.message.channel} | [${language.get('EVENT_STARCREATED_MESSAGE')
                }](${reaction.message.url})`)

        let edited = await reaction.message.client.events.get('starUpdated').run(reaction, channel, embed);
        if (edited) return reaction.message.author.settings.inc(`servers.${guild.id}.starCount`);
        if (notification !== false) this._notification(reaction, guild, channel, user);

        if (ruff.images.test(reaction.message.content) || imgur.image.test(reaction.message.content) || discord.cdn.test(reaction.message.content))
            embed
                .setImage(reaction.message.content)
                .setDescription(`\n${embedEmoji} ${bold`${reaction.count}`} | ${reaction.message.channel 
                } | [${language.get('EVENT_STARCREATED_MESSAGE')}](${reaction.message.url})`)

        let sent = await channel.send(embed).catch(() => null);
        if (sent) sent.react('⭐');
        return reaction.message.author.settings.inc(`servers.${guild.id}.starCount`, minimum);
    }

    getEmoji(reaction) {
        return reaction.count < 5
            ? tier0
            : reaction.count < 10
                ? tier1
                : reaction.count < 15 
                    ? tier2 
                    : tier3;
    }

    _notification(reaction, guild, channel, user) {
        const { language } = guild;

        const embed = new MessageEmbed()
            .setTitle(language.get('EVENT_STARCREATED_TITLE'))
            .setDescription(language.get('EVENT_STARCREATED_DESCRIPTION', user, channel, reaction.message.url))
            .setColor(reaction.message.member.displayColor)
            .setThumbnail(reaction.message.author.displayAvatarURL({ dynamic: true }))

        return reaction.message.channel.send(embed);
    }
}