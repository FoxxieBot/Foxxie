import { LanguageHelpDisplayOptions } from '#lib/i18n/LanguageHelp';
import { FT, T } from '#lib/types';

export const Description = T('commands/websearch/pokemon:description');
export const DetailedDescription = T<LanguageHelpDisplayOptions>('commands/websearch/pokemon:detailedDescription');
export const DexNone = FT<{ pokemon: string }>('commands/websearch/pokemon:dexNone');
export const DexSelect = T('commands/websearch/pokemon:dexSelect');
export const DexSelectPages = T<string[]>('commands/websearch/pokemon:dexSelectPages');
export const DexSmogonUnknown = T('commands/websearch/pokemon:dexSmogonUnknown');
export const MoveNone = FT<{ move: string }>('commands/websearch/pokemon:moveNone');
export const MoveSelect = T('commands/websearch/pokemon:moveSelect');
export const MoveSelectPages = T<string[]>('commands/websearch/pokemon:moveSelectPages');
export const Titles = T<{
	abilities: string;
	baseStats: string;
	baseStatsTotal: string;
	cosmetic: string;
	dex: string;
	eggGroups: string;
	eggObtainable: string;
	ev: string;
	evolutions: string;
	external: string;
	gender: string;
	height: string;
	levelingRate: string;
	maxHatch: string;
	minHatch: string;
	other: string;
	smogon: string;
	weight: string;
}>('commands/websearch/pokemon:titles');
export const TitlesType = FT<{ count: number }>('commands/websearch/pokemon:titles.type');