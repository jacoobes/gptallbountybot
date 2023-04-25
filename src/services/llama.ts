import { type LoadConfig, LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
//import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LLama } from "llama-node";
import * as path from 'path'

export enum Models {
    Vicuna7b = "ggml-vicuna-7b-1.1-q4_1.bin"
}

export class LlamaService {
    private modelPath = path.resolve(process.cwd(), Models.Vicuna7b)
    private config : LoadConfig = { 
        path: this.modelPath,
        enableLogging: true,
        nCtx: 1024,
        nParts: -1,
        seed: 0,
        f16Kv: false,
        logitsAll: false,
        vocabOnly: false,
        useMlock: false,
        embedding: false,
        useMmap: true,    
    }
    private llama = new LLama(LLamaCpp);
    constructor() {}
    tokenize(content : string) {
        return this.llama.tokenize({ content, nCtx: 2048 })
    }
    embed(prompt: string) {
        if(this.config.embedding){
          const params = {
            nThreads: 4,
            nTokPredict: 2048,
            topK: 40,
            topP: 0.1,
            temp: 0.2,
            repeatPenalty: 1,
            prompt,
          };
           return this.llama.getEmbedding(params)
        }
    }

    inference(template: string) {
      const prompt = `The message should have no HTML: ${template}`;

      this.llama.createCompletion({
              nThreads: 4,
              nTokPredict: 2048,
              topK: 40,
              topP: 0.1,
              temp: 0.2,
              repeatPenalty: 1,
              stopSequence: 'The message should have no HTML:',
              prompt,
          },
          (response) => {
              process.stdout.write(response.token);
          });

    }
    init() {
        this.llama.load(this.config)
    }


    

}
