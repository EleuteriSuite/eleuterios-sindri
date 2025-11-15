/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

export {} // ensure this file is a module

declare global {
  interface SindriFilePayload {
    canceled?: boolean
    path?: string
    name?: string
    ext?: string
    content?: string
  }

  interface SindriFilesAPI {
    openDialog: () => void
    onFileContent: (callback: (payload: SindriFilePayload) => void) => void
  }

  interface Window {
    electron: unknown
    sindriFiles: SindriFilesAPI
  }
}
