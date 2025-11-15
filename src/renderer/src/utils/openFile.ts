export const openHandler = () => {
  if (window?.sindriFiles?.openDialog) {
    window.sindriFiles.openDialog()
  }
}

// Reacción opcional al archivo abierto: cargamos el contenido
export const fileOpenedHandler = (markdownContent, htmlContent) => {
  return (e: Event) => {
    const detail = (e as CustomEvent<SindriFilePayload>).detail
    if (detail && !detail.canceled) {
      if (detail.ext === 'md') {
        // Si es markdown, lo mostramos como markdown
        markdownContent.value = detail.content || ''
        htmlContent.value = ''
      } else {
        // Si es txt, lo insertamos como texto plano en el editor
        htmlContent.value = (detail.content || '').replace(/\n/g, '<br/>')
        markdownContent.value = convert(htmlContent.value)
      }
    }
  }
}
