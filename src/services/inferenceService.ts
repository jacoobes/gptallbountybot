import type { AnyThreadChannel } from 'discord.js'
import NodeCache from 'node-cache'
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LLamaEmbeddings } from "llama-node/dist/extensions/langchain.js";

export class InferenceService {
   private cache = new NodeCache() 

   addThread(id: string, thread: AnyThreadChannel) {
       this.cache.set(id, thread)
   }

   getThread(id: string) : AnyThreadChannel|undefined {
       return this.cache.get(id)
   }

}
