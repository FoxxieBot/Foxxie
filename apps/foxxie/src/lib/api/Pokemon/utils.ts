import { MovesEnum, PokemonEnum } from '@favware/graphql-pokemon';
import { container, Events, InteractionHandler, Result, UserError } from '@sapphire/framework';
import { deserialize, serialize } from 'binarytf';
import { Interaction } from 'discord.js';
import { brotliCompressSync, brotliDecompressSync } from 'node:zlib';

import { PokemonSpriteTypes } from './Builders/index.js';

export type KeysContaining<O, Str extends string, Keys extends keyof O = keyof O> = Keys extends string
	? Lowercase<Keys> extends `${string}${Lowercase<Str>}${string}`
		? Keys
		: never
	: never;

export const FavouredPokemon: FavouredEntry<PokemonEnum>[] = [
	{
		key: PokemonEnum.Dragonite,
		name: '⭐ Dragonite'
	},
	{
		key: PokemonEnum.Victini,
		name: '⭐ Victini'
	},
	{
		key: PokemonEnum.Greninjaash,
		name: '⭐ Ash Greninja'
	},
	{
		key: PokemonEnum.Mewtwo,
		name: '⭐ Mewtwo'
	},
	{
		key: PokemonEnum.Rayquaza,
		name: '⭐ Rayquaza'
	},
	{
		key: PokemonEnum.Arceus,
		name: '⭐ Arceus'
	},
	{
		key: PokemonEnum.Vulpixalola,
		name: '⭐ Vulpix (Alola)'
	}
];

export interface FavouredEntry<T> {
	key: T;
	name: `⭐ ${string}`;
}

export function compressCustomIdMetadata<T>(params: T, customMessagePart?: string): string {
	const serializedId = brotliCompressSync(serialize<T>(params)).toString('binary');

	if (serializedId.length > 80) {
		const resolvedCustomMessagePart = customMessagePart ?? '';
		throw new UserError({
			identifier: 'QueryCausedTooLongCustomId',
			message: `Due to Discord API limitations I was unable to resolve that request. ${resolvedCustomMessagePart}This issue will be fixed in the future.`
		});
	}

	return serializedId;
}

export function decompressCustomIdMetadata<T>(
	content: string,
	{ handler, interaction }: { handler: InteractionHandler; interaction: Interaction }
): T {
	const result = Result.from<T, Error>(() =>
		//
		deserialize<T>(brotliDecompressSync(Buffer.from(content, 'binary')) as any)
	);

	return result.match({
		err: (error) => {
			// Emit the error
			container.client.emit(Events.InteractionHandlerParseError, error, { handler, interaction });

			throw new UserError({
				identifier: 'CustomIdFailedToDeserialize',
				message:
					'I am sorry, but that query failed. Please try again. If the problem persists, then please join the support server (use the /info command)'
			});
		},
		ok: (data) => data
	});
}

export function getSpriteTypePokemon(backSprite: boolean, shinySprite: boolean) {
	if (backSprite) {
		if (shinySprite) return 'shinyBackSprite';
		return 'backSprite';
	}

	if (shinySprite) return 'shinySprite';
	return 'sprite';
}

export const compressPokemonCustomIdMetadata = compressCustomIdMetadata<PokemonSelectMenuData>;

export const decompressPokemonCustomIdMetadata = decompressCustomIdMetadata<PokemonSelectMenuData>;

export interface PokemonSelectMenuData {
	generation?: number;
	moves?: MovesEnum[];
	spriteToGet?: PokemonSpriteTypes;
	type: ResponseToGenerate;
}

type ResponseToGenerate = 'flavor' | 'learn' | 'pokemon' | 'sprite';
