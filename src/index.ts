import { bot } from "./bot.ts";
import { event } from "./context.ts";
import { env } from "./env.ts";
import { initLogs } from "./events/client-ready/init-logs.ts";
import { getInfo } from "./events/message-create/get-info.ts";
import { getLogsMessage } from "./events/message-create/get-logs.ts";
import { tryCurseUser } from "./events/message-create/try-curse-user.ts";

bot.login(env.DISCORD_TOKEN);

bot.once("clientReady", event(initLogs));
bot.on("messageCreate", event(tryCurseUser));
bot.on("messageCreate", event(getLogsMessage));
bot.on("messageCreate", event(getInfo));
