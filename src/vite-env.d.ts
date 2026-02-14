/// <reference types="vite/client" />

interface RequestArgs {
    [key: string]: any;
}

interface IpcRenderer {
    invoke<T>(channel: string, ...args: any[]): Promise<T>;
    on(channel: string, listener: (event: any, ...args: any[]) => void): () => void;
}

interface Window {
    ipcRenderer: IpcRenderer;
}
