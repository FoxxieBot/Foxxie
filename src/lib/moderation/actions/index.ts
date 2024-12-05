import { TypeVariation } from '#utils/moderation';
import { ModerationAction } from './base/ModerationAction';
import { RoleModerationAction } from './base/RoleModerationAction';
import { ModerationActionBan } from './ModerationActionBan';
import { ModerationActionDehoist } from './ModerationActionDehoist';
import { ModerationActionKick } from './ModerationActionKick';
import { ModerationActionLock } from './ModerationActionLock';
import { ModerationActionPrune } from './ModerationActionPrune';
import { ModerationActionRaidBan } from './ModerationActionRaidBan';
import { ModerationActionRestrictedAll } from './ModerationActionRestrictedAll';
import { ModerationActionRestrictedAttachment } from './ModerationActionRestrictedAttachment';
import { ModerationActionRestrictedEmbed } from './ModerationActionRestrictedEmbed';
import { ModerationActionRestrictedEmoji } from './ModerationActionRestrictedEmoji';
import { ModerationActionRestrictedReaction } from './ModerationActionRestrictedReaction';
import { ModerationActionRestrictedVoice } from './ModerationActionRestrictedVoice';
import { ModerationActionRoleAdd } from './ModerationActionRoleAdd';
import { ModerationActionRoleRemove } from './ModerationActionRoleRemove';
import { ModerationActionSetNickname } from './ModerationActionSetNickname';
import { ModerationActionSoftban } from './ModerationActionSoftBan';
import { ModerationActionTimeout } from './ModerationActionTimeout';
import { ModerationActionVoiceDeafen } from './ModerationActionVoiceDeafen';
import { ModerationActionVoiceKick } from './ModerationActionVoiceKick';
import { ModerationActionVoiceMute } from './ModerationActionVoiceMute';
import { ModerationActionWarning } from './ModerationActionWarning';

export const ModerationActions = {
	ban: new ModerationActionBan(),
	kick: new ModerationActionKick(),
	mute: new ModerationActionRestrictedAll(),
	prune: new ModerationActionPrune(),
	timeout: new ModerationActionTimeout(),
	restrictedAttachment: new ModerationActionRestrictedAttachment(),
	restrictedEmbed: new ModerationActionRestrictedEmbed(),
	restrictedEmoji: new ModerationActionRestrictedEmoji(),
	restrictedReaction: new ModerationActionRestrictedReaction(),
	restrictedVoice: new ModerationActionRestrictedVoice(),
	roleAdd: new ModerationActionRoleAdd(),
	roleRemove: new ModerationActionRoleRemove(),
	setNickname: new ModerationActionSetNickname(),
	softban: new ModerationActionSoftban(),
	voiceDeafen: new ModerationActionVoiceDeafen(),
	voiceKick: new ModerationActionVoiceKick(),
	voiceMute: new ModerationActionVoiceMute(),
	warning: new ModerationActionWarning(),
	lock: new ModerationActionLock(),
	dehoist: new ModerationActionDehoist(),
	raidBan: new ModerationActionRaidBan()
} as const;

export function getAction<const Type extends TypeVariation>(type: Type): ActionByType<Type> {
	return ModerationActions[ActionMappings[type]];
}

export type ActionByType<Type extends TypeVariation> = (typeof ModerationActions)[(typeof ActionMappings)[Type]];
export type GetContextType<Type extends TypeVariation> =
	ActionByType<Type> extends ModerationAction<infer ContextType, infer _Type> ? ContextType : never;

const ActionMappings = {
	[TypeVariation.RoleAdd]: 'roleAdd',
	[TypeVariation.Ban]: 'ban',
	[TypeVariation.Kick]: 'kick',
	[TypeVariation.Mute]: 'mute',
	[TypeVariation.Prune]: 'prune',
	[TypeVariation.Timeout]: 'timeout',
	[TypeVariation.RoleRemove]: 'roleRemove',
	[TypeVariation.RestrictedAttachment]: 'restrictedAttachment',
	[TypeVariation.RestrictedEmbed]: 'restrictedEmbed',
	[TypeVariation.RestrictedEmoji]: 'restrictedEmoji',
	[TypeVariation.RestrictedReaction]: 'restrictedReaction',
	[TypeVariation.RestrictedVoice]: 'restrictedVoice',
	[TypeVariation.SetNickname]: 'setNickname',
	[TypeVariation.Softban]: 'softban',
	[TypeVariation.VoiceDeafen]: 'voiceDeafen',
	[TypeVariation.VoiceDisconnect]: 'voiceKick',
	[TypeVariation.VoiceMute]: 'voiceMute',
	[TypeVariation.Warning]: 'warning',
	[TypeVariation.Lock]: 'lock',
	[TypeVariation.Dehoist]: 'dehoist',
	[TypeVariation.RaidBan]: 'raidBan'
} as const satisfies Readonly<Record<TypeVariation, ModerationActionKey>>;

export type ModerationActionKey = keyof typeof ModerationActions;
export type RoleModerationActionKey = {
	[K in ModerationActionKey]: (typeof ModerationActions)[K] extends RoleModerationAction<infer _ContextType, infer _Type> ? K : never;
}[ModerationActionKey];

export type RoleTypeVariation = (typeof ModerationActions)[RoleModerationActionKey]['type'];
