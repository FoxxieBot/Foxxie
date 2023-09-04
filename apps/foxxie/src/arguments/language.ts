import { LanguageKeys } from '#lib/i18n';
import type { LanguageString } from '#lib/types';
import { cast } from '@ruffpuff/utilities';
import { Argument, ArgumentContext, ArgumentResult } from '@sapphire/framework';
import i18next from 'i18next';

export class UserArgument extends Argument<LanguageString> {
    public async run(parameter: string, context: ArgumentContext): Promise<ArgumentResult<LanguageString>> {
        const { preload } = i18next.options;
        if (cast<string[]>(preload).includes(parameter)) return this.ok(cast<LanguageString>(parameter));

        return this.error({
            parameter,
            identifier: LanguageKeys.Arguments.Language,
            context: { ...context, list: preload }
        });
    }
}