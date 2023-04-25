import { discordEvent } from "@sern/handler";
import { useContainer } from "../index.js";

export default discordEvent({ 
    name: 'messageCreate',
    plugins: [ ],
    execute: (m) => {
        if(!m.channel.isThread()) return
        const [ inf ] = useContainer('inference')
        const activeThread = inf.getThread(m.channel.id)
        if(!activeThread) return;

        console.log(inf.getVectorStore(activeThread))
        
    }
})
