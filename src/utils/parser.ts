type ParsedCommand = {
	prefix: string;
	commandName: string;
	command: string;
};

const PREFIX = "!";

function parseCommand(
	message: string,
	prefix = PREFIX,
): ParsedCommand | undefined {
	if (!message.startsWith(prefix)) {
		return;
	}

	const [cmd] = message.split(/\s+/g);

	if (!cmd?.[0]) {
		return;
	}

	return {
		prefix: cmd[0],
		commandName: cmd.slice(1),
		command: cmd,
	};
}

export function commandIs(
	message: string,
	commandName: string,
	prefix = PREFIX,
): boolean {
	const command = parseCommand(message, prefix);

	if (!command) {
		return false;
	}

	return command.commandName === commandName;
}
