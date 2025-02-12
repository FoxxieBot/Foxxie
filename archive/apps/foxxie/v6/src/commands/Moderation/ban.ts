import { LanguageKeys } from '#lib/i18n';
import { ModerationCommand } from '#lib/structures';
import { getModeration } from '#utils/Discord';
import { ApplyOptions } from '@sapphire/decorators';
import { ArgumentTypes } from '@sapphire/utilities';
import { PermissionFlagsBits } from 'discord-api-types/v10';

@ApplyOptions<ModerationCommand.Options>({
    aliases: ['b'],
    description: LanguageKeys.Commands.Moderation.BanDescription,
    usage: LanguageKeys.Commands.Moderation.BanUsage,
    duration: true,
    requiredClientPermissions: [PermissionFlagsBits.BanMembers],
    memberOnly: false,
    options: ['days', 'refrence'],
    successKey: LanguageKeys.Commands.Moderation.BanSuccess
})
export class UserCommand extends ModerationCommand {
    public async handle(...[message, context]: ArgumentTypes<ModerationCommand['handle']>) {
        return getModeration(message.guild).actions.ban(
            {
                userId: context.target.id,
                moderatorId: message.author.id,
                duration: context.duration,
                reason: context.reason,
                refrence: context.args.getOption('refrence') ? Number(context.args.getOption('refrence')) : null
            },
            Number(context.args.getOption('days')),
            await this.getDmData(message, context)
        );
    }

    public async checkModeratable(...[message, context]: ArgumentTypes<ModerationCommand['checkModeratable']>) {
        const member = await super.checkModeratable(message, context);
        if (member && !member.bannable)
            throw context.args.t(LanguageKeys.Listeners.Errors.ModerationBannable, { target: `**${context.target.username}**` });
        return member;
    }
}
