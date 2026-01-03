import {
	codeBlock,
	type Message,
	type OmitPartialGroupDMChannel,
} from "discord.js";
import type { AppContext } from "../../context";
import { logFormat } from "../../logger";

const MAX_LEN = 1900;

export async function getLogsMessage(
	ctx: AppContext,
	message: OmitPartialGroupDMChannel<Message<boolean>>,
) {
	const { commandIs } = ctx.utils.parser;
	const { contentAfter } = ctx.utils.string;

	if (!commandIs(message.content, "logs") || message.author.bot) {
		return;
	}

	if (!ctx.isOwner(message.author)) {
		ctx.log.warn(`Unauthorized info request from ${message.author.tag}`);

		return;
	}

	const logs = ctx.logs
		.map((info) => logFormat(info))
		.join("\n")
		.trim()
		.slice(-MAX_LEN);

	if (logs.length === MAX_LEN) {
		await message.reply(codeBlock(`…\n${contentAfter(logs, "\n")}`));

		return;
	}

	await message.reply(codeBlock(logs));
}
