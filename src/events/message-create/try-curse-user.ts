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
	if (message.author.bot) {
		ctx.log.verbose(`Ignoring app message from ${message.author.tag}`);
		return;
	}

	const roll = Math.floor(Math.random() * ctx.env.CURSE_CHANCE);

	if (roll !== 0) {
		ctx.log.verbose(
			`Not cursing user ${message.author.tag} as they rolled ${roll}/${ctx.env.CURSE_CHANCE}`,
		);

		return;
	}

	ctx.log.info(`Cursing user ${message.author.tag}`);

	const asset = ctx.utils.array.pick(ctx.assets);

	if (asset) {
		const attachment = new AttachmentBuilder(asset);

		await message.reply({ files: [attachment] });
	}
}
