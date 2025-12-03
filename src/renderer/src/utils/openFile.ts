export const openHandler = () => {
  if (window?.sindriFiles?.openDialog) {
    window.sindriFiles.openDialog()
  }
}
