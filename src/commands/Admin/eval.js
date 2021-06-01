const { performance } = require('perf_hooks');
const { flags: { async, depth, silent } } = require('../../../lib/util/constants');

module.exports = {
    name: 'eval',
    aliases: ['ev'],
    usage: 'fox eval [code] (-async|-a) (-silent|-s) (-message|-m)',
    category: 'admin',
    permissionLevel: 9,
    async execute ({ message, args, language }) {

        let client = message.client;
        const start = performance.now().toFixed(2);
        const depth = /d=\d/i.test(args[0]) ? args[0].slice(2, 3) : 0;
        let arg = /d=\d/i.test(args[0]) ? args.slice(1).join(" ") : args.slice(0).join(" ");
        let silent = /(-silent|-s)/gi.test(arg);
        let async = /(-async|-a)/gi.test(arg);
        let msg = /(-message|-m)/gi.test(arg);

        try {

            let code = await this.codeReplace(arg);
            if (async) code = `(async () => {\n${code}\n})();`;
            let result = await eval(code);
            let type = typeof result;

            if (result?.length < 1 && result) return message.channel.send(`${language.get('COMMAND_EVAL_OUTPUT')}\n\`\`\`javascript\n${language.get('COMMAND_EVAL_UNDEFINED')}\n\`\`\``);
            if (typeof result !== "string") result = require("util").inspect(result, { depth : depth } );
            const end = performance.now().toFixed(2);
            let time = (end*1000) - (start*1000);

            if (!msg && !silent) message.channel.send(`\n${language.get('COMMAND_EVAL_OUTPUT')}\n\`\`\`javascript\n${result.length > 1900 ? result.substring(0, 1900) : result}\n\`\`\`\n${language.get('COMMAND_EVAL_TYPE')}\n\`\`\`javascript\n${type}\n\`\`\`\n:stopwatch: ${Math.floor(time)}μs`);
            if (msg) message.channel.send('output: ' + result?.length > 1900 ? result.substring(0, 1900) : result);
        } catch(e) {

            let err = typeof e;
            const end = performance.now().toFixed(2);
            let time = (end*1000) - (start*1000);
            message.channel.send(`\n${language.get('COMMAND_EVAL_OUTPUT')}\n\`\`\`javascript\n${e?.length > 1900 ? e.substring(0, 1900) : e}\n\`\`\`\n${language.get('COMMAND_EVAL_TYPE')}\n\`\`\`javascript\n${err}\n\`\`\`\n:stopwatch: ${Math.floor(time)}μs`)
        }
    },

    codeReplace(arg) {
        return arg
            .replace(/(-silent|-s)/gi, '')
            .replace(/(-async|-a)/gi, '')
            .replace(/(-message|-m)/gi, '');
    }
}