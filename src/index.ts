import { AttachmentBuilder } from "discord.js";
import { bot } from "./bot";
import { env } from "./env";
import { chance, pick } from "./utils";
import { Glob } from "bun";

const assets = [
	...new Glob("src/assets/*.{png,jpg,jpeg,gif,webp,mp4,mov}").scanSync(),
];

bot.login(env.DISCORD_TOKEN);

bot.once("clientReady", (event) => {
	console.info(`Logged in as ${event.user.tag}!`);
	console.info(`Curse chance is 1 in ${env.CURSE_CHANCE}`);
	console.info(`Loaded ${assets.length} assets`);
});

bot.on("messageCreate", async (message) => {
	if (message.author.bot || !chance(env.CURSE_CHANCE)) {
		return;
	}

	console.info(`Cursing user ${message.author.tag}`);

	const asset = pick(assets);

	if (asset) {
		const attachment = new AttachmentBuilder(asset);

		await message.reply({ files: [attachment] });
	}
});
