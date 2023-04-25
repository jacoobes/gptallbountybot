import { Client, GatewayIntentBits } from 'discord.js';
import {
	Dependencies,
	Sern,
	single,
	Singleton,
	DefaultLogging,
} from '@sern/handler';
import { LlamaService } from './services/llama.js';
import dotenv from 'dotenv'
dotenv.config()
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent, //Make sure this is enabled for text commands!
	],
});

//With typescript, you can customize / augment your typings.
interface MyDependencies extends Dependencies {
	'@sern/client': Singleton<Client>;
	'@sern/logger': Singleton<DefaultLogging>;
        'llama': Singleton<LlamaService>
}
/**
 * Where all of your dependencies are composed.
 * '@sern/client' is usually your Discord Client.
 * View documentation for pluggable dependencies
 * Configure your dependency root to your liking.
 * It follows the npm package iti https://itijs.org/.
 * Use this function to access all of your dependencies.
 * This is used for external event modules as well
 */
export const useContainer = Sern.makeDependencies<MyDependencies>({
	build: (root) =>
		root
		    .add({ '@sern/client': single(() => client) })
		    .upsert({ '@sern/logger': single(() => new DefaultLogging()) }) 
                    .add({ 'llama': single(() => new LlamaService())}),
})

client.once('ready', () => {
    const [ llama ] = useContainer('llama')
    llama.init()
})
//View docs for all options
Sern.init({
	commands: 'dist/commands',
	events: 'dist/events',
	containerConfig: {
		get: useContainer,
	},
});

client.login();
