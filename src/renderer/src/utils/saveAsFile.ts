import { SindriFileSavedPayload } from '@renderer/env'

export const saveHandler = (filePath: string, content: string) => {
  if (!filePath) return saveAsHandler(content)

  return () => {
    if (window?.sindriFiles?.save) {
      window.sindriFiles.save(filePath, content)
    }
  }
}

export const saveAsHandler = (content: string) => {
  return () => {
    if (window?.sindriFiles?.saveAsDialog) {
      window.sindriFiles.saveAsDialog(content)
    }
  }
}

// Reacción opcional al archivo abierto: cargamos el contenido
export const fileSavedHandler = (fileSaved) => {
  return (e: Event) => {
    const detail = (e as CustomEvent<SindriFileSavedPayload>).detail
    if (detail && !detail.canceled) {
      fileSaved.value = true
    }
  }
}
