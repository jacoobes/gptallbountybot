import { type LoadConfig, LLamaCpp } from "llama-node/dist/llm/llama-cpp";
import { LLama } from "llama-node";
import * as path from 'path'

enum Models {
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
    init() {
       this.llama.load(this.config)
    }

    tokenize(content : string) {
        return this.llama.tokenize({ content, nCtx: 2048 })
    }


    

}
