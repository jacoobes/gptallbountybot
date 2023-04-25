import { controller, DiscordEventControlPlugin } from "@sern/handler";
import { ChannelType } from "discord.js";

export function onCorrectThread(threadName: string) {
    return DiscordEventControlPlugin(
        "threadCreate",
        (thread, newlyMade) => {
	const isBadThread = 
            !thread.parent ||
            thread.name !== threadName ||
            thread.parent.type !== ChannelType.GuildText ||
            !newlyMade
            if (!isBadThread) {
                return controller.next();
            }
                return controller.stop();
        }
    )
}
