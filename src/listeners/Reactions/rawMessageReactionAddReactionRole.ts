import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { GatewayDispatchEvents, GatewayMessageReactionAddDispatch, APIEmoji } from 'discord-api-types/v10';
import type { Guild } from 'discord.js';
import { floatPromise } from '#utils/util';
import { acquireSettings, GuildSettings } from '#lib/database';
import { isDev, resolveToNull } from '@ruffpuff/utilities';

@ApplyOptions<ListenerOptions>({
    enabled: !isDev(),
    event: GatewayDispatchEvents.MessageReactionAdd,
    emitter: 'ws'
})
export class UserListener extends Listener {
    public async run({ user_id: userId, guild_id: guildId, message_id: messageId, emoji }: GatewayMessageReactionAddDispatch['d']): Promise<void> {
        const guild = this.container.client.guilds.cache.get(guildId!);
        if (!guild) return;

        await this.runReactionRole(userId, messageId, guild, emoji);
    }

    private async runReactionRole(userId: string, messageId: string, guild: Guild, emoji: APIEmoji): Promise<void> {
        const reactionRoles = await acquireSettings(guild, GuildSettings.Roles.Reaction);
        if (!reactionRoles.length) return;

        const member = await resolveToNull(guild.members.fetch(userId));

        for (const reactionRole of reactionRoles) {
            const decodedEmoji = reactionRole.emoji.includes('%') ? decodeURIComponent(reactionRole.emoji) : reactionRole.emoji;

            if (reactionRole.messageId !== messageId || (decodedEmoji !== emoji.id && decodedEmoji !== emoji.name)) continue;

            if (!member || member.user.bot) continue;

            const role = guild.roles.cache.get(reactionRole.roleId);
            if (!role) continue;

            await floatPromise(member.roles.add(role.id));
        }
    }
}
