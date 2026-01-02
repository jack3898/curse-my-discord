import { bot } from "./bot.ts";
import { env } from "./env.ts";
import { initLogs } from "./events/client-ready/init-logs.ts";
import { event } from "./context.ts";
import { tryCurseUser } from "./events/message-create/try-curse-user.ts";

bot.login(env.DISCORD_TOKEN);

bot.once("clientReady", event(initLogs));
bot.on("messageCreate", event(tryCurseUser));
