import {
	AttachmentBuilder,
	type Message,
	type OmitPartialGroupDMChannel,
} from "discord.js";
import type { AppContext } from "../../context";

export async function tryCurseUser(
	ctx: AppContext,
	message: OmitPartialGroupDMChannel<Message<boolean>>,
) {
	if (message.author.bot || !ctx.utils.chance(ctx.env.CURSE_CHANCE)) {
		return;
	}

	console.info(`Cursing user ${message.author.tag}`);

	const asset = ctx.utils.pick(ctx.assets);

	if (asset) {
		const attachment = new AttachmentBuilder(asset);

		await message.reply({ files: [attachment] });
	}
}
