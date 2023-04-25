import { type LoadConfig, LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
import { LLama } from "llama-node";
import * as path from 'path'

export enum Model {
    Vicuna7b = "ggml-vicuna-7b-1.1-q4_1.bin"
}

export class LlamaService {
    private modelPath = path.resolve(process.cwd(), Model.Vicuna7b)
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
    llama = new LLama(LLamaCpp);
    constructor() {}
    embed(prompt: string) {
        if(this.config.embedding){
          const params = {
            nThreads: 8,
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
    generateModelPath(m: Model) {
        return path.resolve(process.cwd(), m)
    }
    inference(template: string): Promise<string> {
      const prompt = `
        HUMAN:
            ${template}
        ASSISTANT:`;
     return new Promise((resolve, reject) => {
          let buffer = "";
          try {
            this.llama.createCompletion({
                nThreads: 4,
                nTokPredict: 2048,
                topK: 40,
                topP: 0.1,
                temp: 0.2,
                repeatPenalty: 1,
                stopSequence: 'HUMAN:',
                prompt,
            },  (response) => {
                if(response.completed) {
                    resolve(buffer) 
                } else {
                    buffer+=response.token
                }
            });
          } catch(e) {
                reject(e)
          }
      })
      
    }
    init() {
        this.llama.load(this.config)
    }


}
