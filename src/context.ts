import { globSync } from "node:fs";
import path from "node:path";
import type { Logger } from "winston";
import { bot } from "./bot";
import { env } from "./env";
import { type FormatSchema, getTail, logger } from "./logger";
import * as utils from "./utils";

export type AppContext = {
	bot: typeof bot;
	assets: string[];
	env: typeof env;
	utils: typeof utils;
	log: Logger;
	logs: FormatSchema[];
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const assets = globSync(
	path.join(__dirname, "assets", "*.{png,jpg,jpeg,gif,webp,mp4,mov}"),
);

const context: AppContext = {
	bot,
	assets,
	env,
	utils,
	log: logger,
	get logs() {
		return getTail(40);
	},
};

export type EventHandler<T> = (context: AppContext, ...args: T[]) => void;

export function event<T>(handler: EventHandler<T>) {
	return (...args: T[]) => handler(context, ...args);
}
