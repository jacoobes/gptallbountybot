import { discordEvent } from "@sern/handler";

export default discordEvent({ 
    name: 'messageCreate',
    plugins: [ ],
    execute: (m) => {
        if(m.channel.isThread()) {
            
        }
    }
})
