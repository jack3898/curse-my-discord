import { type } from "arktype";

const Env = type({
	DISCORD_TOKEN: "string",
	CURSE_CHANCE: "string.numeric.parse",
});

export const env = Env.assert(process.env);
