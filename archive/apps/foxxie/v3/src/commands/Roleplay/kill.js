const RoleplayCommand = require('~/lib/structures/RoleplayCommand');

module.exports = class extends RoleplayCommand {

    constructor(...args) {
        super('kill', ['murder', 'destroy'], false, ...args)
    }
}