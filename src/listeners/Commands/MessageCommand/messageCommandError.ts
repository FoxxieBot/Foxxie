import { EventArgs, FoxxieEvents } from '#lib/Types';
import { Listener } from '@sapphire/framework';

export class UserListener extends Listener<FoxxieEvents.MessageCommandError> {
    public async run(...[error, payload]: EventArgs<FoxxieEvents.MessageCommandError>) {
        return this.container.utilities.errors.handleMessageCommandError(error, payload);
    }
}
