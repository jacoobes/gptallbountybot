import type { AnyThreadChannel } from 'discord.js'
import NodeCache from 'node-cache'
import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LLamaEmbeddings } from "llama-node/dist/extensions/langchain.js";
import type { LlamaService } from './llama';
//const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
export class InferenceService {
   private cache = new NodeCache() 
   private contexts = new WeakMap<AnyThreadChannel, MemoryVectorStore>()

   constructor(private llama: LlamaService) {}

   async addThread(id: string, thread: AnyThreadChannel, startingContent: string[] ) {
       this.cache.set(id, thread)
//       try {
//        const pool = await MemoryVectorStore.fromTexts(
//          ["Hello world", "Bye bye", "hello nice world"],
//          [{ id: 2 }, { id: 1 }, { id: 3 }],
//          new LLamaEmbeddings({ maxConcurrency: 1 }, this.llama.llama)
//       )
//       this.contexts.set(thread, pool)
//       } catch(e) {
//            console.log(e)
//       }
       
   }

   getThread(id: string) : AnyThreadChannel|undefined {
       return this.cache.get(id)
   }

   getVectorStore(thread: AnyThreadChannel): MemoryVectorStore|undefined {
      return this.contexts.get(thread)
   }

}
