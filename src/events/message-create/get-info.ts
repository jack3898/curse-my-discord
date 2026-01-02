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
	if (ctx.env.OWNER_ID !== message.author.id && !message.author.bot) {
		ctx.log.warn(`Unauthorized info request from ${message.author.tag}`);

		return;
	}

	if (message.content.startsWith("!info")) {
		const payload = {
			curseChance: ctx.env.CURSE_CHANCE,
			assetCount: ctx.assets.length,
		};

		await message.reply(codeBlock(JSON.stringify(payload, null, 2)));
	}
}
