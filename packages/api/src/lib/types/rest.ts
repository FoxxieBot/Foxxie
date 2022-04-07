/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { CombineObjects } from '@ruffpuff/ts';

/**
 * The result for the `GET /users` endpoint.
 * Contains an array of {@link Partial} user objects in the API.
 */
export type RESTGetAPIUsersResult = {
    /**
     * An array of {@link Partial} user objects in the API.
     * Omitting the bans field on the users.
     */
    users: RESTGetAPIUsersUserBaseObject[];
};

/**
 * Represents a base user in the API.
 * Does not contain the `bans` field.
 */
export type RESTGetAPIUsersUserBaseObject = {
    /**
     * The user's id as is represented in the API.
     */
    userId: string;
    /**
     * A user's pronouns as represented by the {@link PronounEnum}.
     * Defaults to `0` or {@link PronounEnum.None}.
     */
    pronouns: PronounEnum;
    /**
     * Whether the user is whitelisted in the API.
     * If this field is `true` the user will be able to bypass certain moderation checks on their account.
     */
    whitelisted: boolean;
};

/**
 * The result for the `GET /users/:id` endpoint.
 * Represents a user in the API.
 */
export type RESTGetAPIUsersUserResult = CombineObjects<RESTGetAPIUsersUserBaseObject, RESTGetAPIUsersUserBansResult>;

/**
 * The JSON body to send in the `POST /users/:id` endpoint.
 * Every member of the body is optional and if not provided will be set to their default values.
 */
export type RESTPostAPIUsersUserJSONBody = AddUndefinedToPossiblyUndefinedPropertiesOfInterface<{
    /**
     * An integer representing the pronouns the user goes by.
     * Must be a member of the {@link PronounEnum} or not specified.
     */
    pronouns?: PronounEnum;
}>;

/**
 * The result for the `GET /users/:id/bans` endpoint.
 * Contains an array of user ban objects.
 * If the array is empty, the user has no bans.
 */
export type RESTGetAPIUsersUserBansResult = {
    /**
     * An array of {@link RESTGetAPIUserUserBansBan} objects.
     * Will be an empty array if the user has no bans.
     */
    bans: RESTGetAPIUserUserBansBan[];
};

export type RESTGetAPIUserUserBansBan = {
    /**
     * The provider for the ban, will currently always be `Foxxie`.
     */
    provider: 'Foxxie';
    /**
     * The reason for the ban.
     */
    reason: string;
    /**
     * The Id of the moderator who created the ban.
     */
    moderatorId: string;
    /**
     * An ISO date string that represents when the ban was created.
     */
    createdAt: string;
    /**
     * The Id of the user who this ban belongs to.
     */
    userId: string;
};

export type RESTGetAPIUsersUserPronounsResult = {
    /**
     * A user's pronouns as represented by the {@link PronounEnum}.
     * Defaults to `0` or {@link PronounEnum.None}.
     */
    pronouns: PronounEnum;
};

/**
 * The pronouns in the API.
 */
export enum PronounEnum {
    /**
     * The default value if a user has not selected their pronouns.
     */
    None,
    /**
     * If a user goes by `He/Him` pronouns.
     */
    HeHim,
    /**
     * If a user goes by `He/Her` pronouns.
     */
    HeHer,
    /**
     * If a user goes by `He/It` pronouns.
     */
    HeIt,
    /**
     * If a user goes by `He/They` pronouns.
     */
    HeThey,
    /**
     * If a user goes by `They/Them` pronouns.
     */
    TheyThem,
    /**
     * If a user goes by `They/He` pronouns.
     */
    TheyHe,
    /**
     * If a user goes by `They/She` pronouns.
     */
    TheyShe,
    /**
     * If a user goes by `They/It` pronouns.
     */
    TheyIt,
    /**
     * If a user goes by `She/Her` pronouns.
     */
    SheHer,
    /**
     * If a user goes by `She/Him` pronouns.
     */
    SheHim,
    /**
     * If a user goes by `She/It` pronouns.
     */
    SheIt,
    /**
     * If a user goes by `She/They` pronouns.
     */
    SheThey,
    /**
     * If a user goes by `It/Its` pronouns.
     */
    ItIts,
    /**
     * If a user goes by `It/Him` pronouns.
     */
    ItHim,
    /**
     * If a user goes by `It/Her` pronouns.
     */
    ItHer,
    /**
     * If a user goes by `It/Them` pronouns.
     */
    ItThem,
    /**
     * If a user goes by `Other` pronouns.
     */
    Other,
    /**
     * If a user want to be refered to with their name rather than pronouns.
     */
    UseName,
    /**
     * If a user would like you to ask for their pronouns.
     */
    Ask
}

type AddUndefinedToPossiblyUndefinedPropertiesOfInterface<Base> = {
    [K in keyof Base]: Base[K] extends Exclude<Base[K], undefined> ? Base[K] : Base[K] | undefined;
};