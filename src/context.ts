import path from "node:path";
import { bot } from "./bot";
import { env } from "./env";
import { globSync } from "node:fs";
import * as utils from "./utils";

export type AppContext = {
	bot: typeof bot;
	assets: string[];
	env: typeof env;
	utils: typeof utils;
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
};

export type EventHandler<T> = (context: AppContext, ...args: T[]) => void;

export function event<T>(handler: EventHandler<T>) {
	return (...args: T[]) => handler(context, ...args);
}
