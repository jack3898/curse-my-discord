import { AttachmentBuilder } from "discord.js";
import { bot } from "./bot.ts";
import { env } from "./env.ts";
import { chance, pick } from "./utils.ts";
import { globSync } from "node:fs";
import path from "node:path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const assets = globSync(
	path.join(__dirname, "assets", "*.{png,jpg,jpeg,gif,webp,mp4,mov}"),
);

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
