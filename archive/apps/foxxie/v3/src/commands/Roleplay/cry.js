const RoleplayCommand = require('~/lib/structures/RoleplayCommand');

module.exports = class extends RoleplayCommand {

    constructor(...args) {
        super('cry', ['sob'], true, ...args)
    }
}