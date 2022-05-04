// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import {ipcRenderer, contextBridge, IpcRendererEvent, IpcRenderer} from "electron"

export type ContextBridgeApi = {
  // Declare a `readFile` function that will return a promise. This promise
  // will contain the data of the file read from the main process.
  send: (channel: string, data: any) => void
  receive: (channel: any, listener: (event: IpcRendererEvent, ...args: any[]) => void) => IpcRenderer
}

contextBridge.exposeInMainWorld(
  "contextBridgeApi", {
      send: (channel: string, ...args: any[]) => {
          ipcRenderer.send(channel, ...args);
      },
      receive: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
        return ipcRenderer.on(channel, listener);
      }
  }
);