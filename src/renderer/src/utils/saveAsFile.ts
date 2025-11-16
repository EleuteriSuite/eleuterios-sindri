import { SindriFileSavedPayload } from '@renderer/env'

export const saveHandler = (filePath, content) => {
  if (!filePath.value) return saveAsHandler(content.value)

  return () => {
    if (window?.sindriFiles?.save) {
      window.sindriFiles.save(filePath.value, content.value)
    }
  }
}

export const saveAsHandler = (content) => {
  return () => {
    if (window?.sindriFiles?.saveAsDialog) {
      window.sindriFiles.saveAsDialog(content.value)
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
