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
	if (ctx.env.OWNER_ID !== message.author.id && !message.author.bot) {
		ctx.log.warn(`Unauthorized info request from ${message.author.tag}`);

		return;
	}

	if (
		message.content.startsWith("!tail") ||
		message.content.startsWith("!logs")
	) {
		const { after } = ctx.utils.string;

		const logs = ctx.logs
			.map((info) => logFormat(info))
			.join("\n")
			.trim()
			.slice(-MAX_LEN);

		if (logs.length === MAX_LEN) {
			await message.reply(codeBlock(`…\n${after(logs, "\n")}`));

			return;
		}

		await message.reply(codeBlock(logs));
	}
}
