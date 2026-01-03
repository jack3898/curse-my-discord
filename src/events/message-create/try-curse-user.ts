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
	const { pickRandom } = ctx.utils.array;
	const { roll } = ctx.utils.number;

	if (message.author.bot || !message.inGuild()) {
		return;
	}

	const rollResult = roll(ctx.env.CURSE_CHANCE);

	if (rollResult !== 0) {
		ctx.log.verbose(
			`Not cursing user ${message.author.tag} as they rolled ${rollResult}/${ctx.env.CURSE_CHANCE}`,
		);

		return;
	}

	ctx.log.info(`Cursing user ${message.author.tag} as they rolled 0!`);

	const asset = pickRandom(ctx.assets);

	if (asset) {
		const attachment = new AttachmentBuilder(asset);

		await message.reply({ files: [attachment] });
	} else {
		await message.reply("lmao");
	}
}
