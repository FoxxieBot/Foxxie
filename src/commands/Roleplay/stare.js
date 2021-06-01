const RoleplayCommand = require('../../../lib/structures/RoleplayCommand');
module.exports = {
    name: 'stare',
    aliases: ['glance'],
    usage: `fox stare (user) (reason)`,
    category: 'roleplay',
    execute(props) {

        let { message, args } = props
        
        return new RoleplayCommand(message).execute("stare", args, true)
    }
}