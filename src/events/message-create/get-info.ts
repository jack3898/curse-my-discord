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
	if (message.content.startsWith("!info")) {
		const payload = {
			curseChance: ctx.env.CURSE_CHANCE,
			assetCount: ctx.assets.length,
		};

		await message.reply(codeBlock(JSON.stringify(payload, null, 2)));
	}
}
