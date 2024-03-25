import { RequestMessage, InitializeResult} from "../types"
const initializeMethod =  (message: RequestMessage): InitializeResult =>{
    return {
        capabilities: {},
        serverInfo: {
            name: "lsp_custom",
            version: "0.0.1",
        }
    }
}

export default initializeMethod;