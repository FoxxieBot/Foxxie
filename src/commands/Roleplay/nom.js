const RoleplayCommand = require('../../../lib/structures/RoleplayCommand');
module.exports = {
    name: 'nom',
    aliases: ['nip', 'consume'],
    usage: `fox nom [user] (reason)`,
    category: 'roleplay',
    execute(props) {

        let { message, args, lang } = props
        
        return new RoleplayCommand(message).execute(lang, "nom", args, false)
    }
}