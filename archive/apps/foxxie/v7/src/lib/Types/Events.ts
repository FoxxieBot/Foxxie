export const enum FoxxieEvents {
    AnalyticsPostStats = 'analyticsPostStats',
    AnalyticsSync = 'analyticsSync',
    BotMessage = 'botMessage',
    ChatInputCommandDenied = 'chatInputCommandDenied',
    ChatInputCommandError = 'chatInputCommandError',
    ChatInputCommandFinish = 'chatInputCommandFinish',
    ChatInputCommandLogging = 'chatInputCommandLogging',
    ChatInputSubcommandError = 'chatInputSubcommandError',
    CommandDoesNotHaveMessageCommandHandler = 'commandDoesNotHaveMessageCommandHandler',
    Error = 'error',
    GuildBanAdd = 'guildBanAdd',
    GuildBanRemove = 'guildBanRemove',
    GuildMemberAdd = 'guildMemberAdd',
    GuildMemberJoin = 'guildMemberJoin',
    GuildMemberRemove = 'guildMemberRemove',
    GuildMemberUpdate = 'guildMemberUpdate',
    GuildMessageLog = 'guildMessageLog',
    GuildMessageUpdateLog = 'messageUpdate',
    LastFmUpdateUser = 'lastFmUpdateUser',
    ListenerError = 'listenerError',
    MemberIdleLog = 'memberIdleLog',
    MentionPrefixOnly = 'mentionPrefixOnly',
    MessageCommandDenied = 'messageCommandDenied',
    MessageCommandError = 'messageCommandError',
    MessageCommandFinish = 'messageCommandFinish',
    MessageCommandLogging = 'messageCommandLogging',
    MessageCreate = 'messageCreate',
    MessageDelete = 'messageDelete',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    MessageUpdate = 'messageUpdate',
    MessageSubcommandError = 'messageSubcommandError',
    MessageSubcommandNoMatch = 'messageSubcommandNoMatch',
    ModerationEntryAdd = 'moderationEntryAdd',
    ModerationEntryEdit = 'moderationEntryEdit',
    PresenceUpdate = 'presenceUpdate',
    PointsMember = 'pointsMember',
    PointsReward = 'pointsReward',
    PointsUser = 'pointsUser',
    Ready = 'ready',
    ShardDisconnect = 'shardDisconnect',
    ShardError = 'shardError',
    ShardReady = 'shardReady',
    ShardReconnecting = 'shardReconnecting',
    ShardResume = 'shardResume',
    StatsMemberCount = 'statsMemberCount',
    StatsMessage = 'statsMessage',
    SystemMessage = 'systemMessage',
    TaskError = 'taskError',
    ThreadCreate = 'threadCreate',
    UnknownMessageCommand = 'unknownMessageCommand',
    UnknownMessageCommandName = 'unknownMessageCommandName',
    UserMessage = 'userMessage',
    VoiceChannelDeafened = 'voiceChannelDeafened',
    VoiceChannelJoin = 'voiceChannelJoin',
    VoiceChannelLeave = 'voiceChannelLeave',
    VoiceChannelMuted = 'voiceChannelMuted',
    VoiceChannelUndeafened = 'voiceChannelUndeafened',
    VoiceChannelUnmuted = 'voiceChannelUnmuted',
    VoiceStateUpdate = 'voiceStateUpdate'
}