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
	if (message.content.startsWith("!tail")) {
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
