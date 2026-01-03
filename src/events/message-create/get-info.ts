import {
	codeBlock,
	type Message,
	type OmitPartialGroupDMChannel,
} from "discord.js";
import type { AppContext } from "../../context";

export async function getInfo(
	ctx: AppContext,
	message: OmitPartialGroupDMChannel<Message<boolean>>,
) {
	const { commandIs } = ctx.utils.parser;

	if (!commandIs(message.content, "info") || message.author.bot) {
		return;
	}

	if (!ctx.isOwner(message.author)) {
		ctx.log.warn(`Unauthorized info request from ${message.author.tag}`);

		return;
	}

	const payload = {
		curseChance: ctx.env.CURSE_CHANCE,
		assetCount: ctx.assets.length,
	};

	await message.reply(codeBlock(JSON.stringify(payload, null, 2)));
}
