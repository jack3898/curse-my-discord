import {
	codeBlock,
	type Message,
	type OmitPartialGroupDMChannel,
} from "discord.js";
import type { AppContext } from "../../context";
import { logFormat } from "../../logger";

export async function getLogsMessage(
	ctx: AppContext,
	message: OmitPartialGroupDMChannel<Message<boolean>>,
) {
	if (ctx.env.OWNER_ID !== message.author.id) {
		ctx.log.warn(`Unauthorized info request from ${message.author.tag}`);

		return;
	}

	if (
		message.content.startsWith("!tail") ||
		message.content.startsWith("!logs")
	) {
		const logs = ctx.logs
			.map((info) => logFormat(info))
			.join("\n")
			.trim();

		if (logs.length > 0) {
			await message.reply(codeBlock(logs));
		} else {
			await message.reply("No logs available.");
		}
	}
}
