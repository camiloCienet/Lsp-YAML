// From Docs Lsp 

export interface Message {
    jsonrpc: string;
}
export interface RequestMessage extends Message {

	id: number | string;
	method: string;
	params?: unknown[] | object;
}
type ServerCapabilities = Record<string , unknown>
export interface InitializeResult {
	capabilities: ServerCapabilities;
	serverInfo?: {
		name: string;
		version?: string;
	};
}