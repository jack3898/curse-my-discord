import type { Client } from "discord.js";
import type { AppContext } from "../../context";

export function initLogs(ctx: AppContext, event: Client<true>) {
	ctx.log.info(`Logged in as ${event.user.tag}!`);
	ctx.log.info(`Curse chance is 1 in ${ctx.env.CURSE_CHANCE}`);
	ctx.log.info(`Loaded ${ctx.assets.length} assets`);
}
