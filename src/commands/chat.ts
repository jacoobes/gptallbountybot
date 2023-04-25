import { commandModule, CommandType } from "@sern/handler";
import { ApplicationCommandOptionType, ChannelType, TextChannel } from "discord.js";
import { channelType } from "../plugins/channelType.js";
import { publish } from "../plugins/publish.js";
import { Models } from "../services/llama.js";


export default commandModule({
   type: CommandType.Slash ,
   description: "Chat with bot",
   plugins: [
       publish(),
       channelType([ ChannelType.GuildText ], 'I cannot start a chat here!')
   ],
   options: [
     {
        name: 'model', 
        description: 'choose a model',
        type: ApplicationCommandOptionType.String,
        choices: Object.entries(Models).map(
            ([name, value]) => ({ name, value })
        ),
        required: true
     },
     {
        name: 'chat',
        description: 'start chatting with bro',
        type: ApplicationCommandOptionType.String,
        required: true

     }
   ],
   execute:  async (ctx, [type, args]) => {
       const model = args.getString('model', true) as Models;
       const startingPrompt = args.getString('chat', true);
       const c = ctx.interaction.channel as TextChannel
       const m = await ctx.reply(`New chat: ${model};;${startingPrompt}`);
       const thread = await c.threads.create({
        	name: 'chat-bro',
                type: ChannelType.PrivateThread,
        	reason: 'Requested bot talk',
                startMessage: m.id
       });
       await thread.members.add(ctx.user).then(
            () => thread.members.add(ctx.client.user!)
       )
       

   }
})
