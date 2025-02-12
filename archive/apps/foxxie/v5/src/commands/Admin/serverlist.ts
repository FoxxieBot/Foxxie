import { FoxxieCommand } from '#lib/structures';
import { LanguageKeys } from '#lib/i18n';
import { ApplyOptions } from '@sapphire/decorators';
import { Message, MessageEmbed, Util } from 'discord.js';
import { PaginatedMessage } from '#external/PaginatedMessage';
import { PermissionLevels } from '#lib/types';
import { chunk } from '@ruffpuff/utilities';

@ApplyOptions<FoxxieCommand.Options>({
    aliases: ['sl'],
    permissionLevel: PermissionLevels.BotOwner,
    guarded: true,
    description: LanguageKeys.Commands.Admin.ServerlistDescription,
    detailedDescription: LanguageKeys.Commands.Admin.ServerlistDetailedDescription
})
export class UserCommand extends FoxxieCommand {
    public async messageRun(msg: Message, args: FoxxieCommand.Args): Promise<void> {
        const template = new MessageEmbed()
            .setAuthor({ name: args.t(LanguageKeys.Commands.Admin.ServerlistTitle, { name: this.client.user!.username }), iconURL: this.client.user!.displayAvatarURL() })
            .setColor(args.color);

        const display = new PaginatedMessage({ template });
        display.pageIndexPrefix = args.t(LanguageKeys.Commands.Admin.ServerlistFooter, { count: this.client.guilds.cache.size });

        const pages = chunk(
            this.client.guilds.cache
                .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                .map(r => r)
                .map((guild, idx) =>
                    [
                        `${args.t(LanguageKeys.Globals.NumberFormat, { value: idx + 1 })}.`,
                        Util.escapeMarkdown(guild.name),
                        `[${guild.id}] | **${guild.memberCount}**`,
                        `${args.t(LanguageKeys.Commands.Admin.ServerlistMembers)}`
                    ].join(' ')
                ),
            10
        );

        for (const page of pages) display.addPageEmbed(embed => embed.setDescription(page.join('\n')));
        await display.run(msg);
    }
}
