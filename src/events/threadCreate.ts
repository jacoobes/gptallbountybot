import { eventModule, EventType } from "@sern/handler";
import type { AnyThreadChannel } from "discord.js";
import { useContainer } from "../index.js";
import { onCorrectThread } from "../plugins/onCorrectThread.js";
const forumId = "chat-bro";
export default eventModule({
	type: EventType.Discord,
	plugins: [onCorrectThread(forumId)],
	name: "threadCreate",
	async execute(thread: AnyThreadChannel, _: boolean) {
	    const msg = await thread.fetchStarterMessage().catch(() => null);
	    if (!msg) return thread.setLocked(true);
            const [ llama ] = useContainer('llama')
            const startContentLocation = msg.content.indexOf(';;')
            const tms = msg.content.substring(startContentLocation+2)
            llama.inference(tms)
            thread.send("Sup")
    },
});