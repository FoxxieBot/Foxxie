const { Event } = require('@foxxie/tails');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            event: 'commandInhibited'
        })
    }

	run(message, command, response) {
		if (response && response.length) message.channel.send(response);
	}
};