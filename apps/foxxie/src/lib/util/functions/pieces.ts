import { Piece } from '@sapphire/framework';
import { bgBlue, bgRed } from 'colorette';

export function getCodeStyle(code: number | string) {
	return bgRed(`[ ${code} ]`);
}

export function getLogPrefix(piece: Piece | string) {
	return bgBlue(piece instanceof Piece ? `[ ${piece.store.name} => ${piece.name} ]` : `[ ${piece} ]`);
}
