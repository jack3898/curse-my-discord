import type { Client } from "discord.js";
import type { AppContext } from "../../context";

export function initLogs(ctx: AppContext, event: Client<true>) {
	console.info(`Logged in as ${event.user.tag}!`);
	console.info(`Curse chance is 1 in ${ctx.env.CURSE_CHANCE}`);
	console.info(`Loaded ${ctx.assets.length} assets`);
}
