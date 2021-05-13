const RoleplayCommand = require('../../../lib/structures/RoleplayCommand');
module.exports = {
    name: 'wave',
    aliases: ['hello', 'greet', 'bye', 'goodbye', 'hi', 'hey'],
    usage: `fox tease (user) (reason)`,
    category: 'roleplay',
    execute(props) {

        let { message, args, lang } = props
        
        return new RoleplayCommand(message).execute(lang, "wave", args, true)
    }
}