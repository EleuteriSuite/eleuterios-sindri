<template>
  <webview ref="server_static_preview" style="width: 100%; height: 100%" allowpopups />
</template>
<script setup lang="ts">
import { openHandler } from '@renderer/utils/openFile'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { marked } from "marked";
import { SindriFileSavedPayload } from '@renderer/env'

// Se usa en fileOpenedHandler
const emit = defineEmits(['file-opened'])

const server_static_preview = ref<any | null>(null)

// State to coordinate
const pendingPreviewUrl = ref<string | null>(null)
const webviewReady = ref(false)

const props = defineProps(['markdownContent'])

const filePath = defineModel('filePath', { type: String, required: true })
const fileSaved = defineModel('fileSaved', { type: Boolean, required: true })

watch(filePath, (newFilePath, oldFilePath) => {
  if (newFilePath !== '' && newFilePath !== oldFilePath) {
    openSindriServerStatic()
  }
})
const openSindriServerStatic = () => {
  window.sindriServerStatic.startPreview(filePath.value)
}
const HandleSindriServerStaticLoaded = (previewServer) => {
  if (!previewServer || !previewServer.url) return

  pendingPreviewUrl.value = previewServer.url
  tryLoadPreviewIntoWebview()
}
const tryLoadPreviewIntoWebview = () => {
  if (!pendingPreviewUrl.value || !server_static_preview.value || !webviewReady.value) {
    return
  }

  const webview = server_static_preview.value
  const url = pendingPreviewUrl.value

  const finalUrl = `${url}?_ts=${Date.now()}`

  webview.setAttribute('src', finalUrl)

  pendingPreviewUrl.value = null
}

// Save functionality
const HandleSindriFileSaved = (payload: SindriFilePayload): EventListener => {
  if (server_static_preview.value) {
    server_static_preview.value.reload()
  }

  return fileSavedHandler(payload) as EventListener
}
const saveHandler = (): EventListener => {
  if (!filePath.value) {
    saveAsHandler()
  }

  if (window?.sindriFiles?.save) {
    window.sindriFiles.save(filePath.value, props.markdownContent)
  }

  return () => {}
}
const saveAsHandler = (): EventListener => {
  if (window?.sindriFiles?.saveAsDialog) {
    window.sindriFiles.saveAsDialog(props.markdownContent)
  }

  return () => {}
}
// Reacción opcional al archivo abierto: cargamos el contenido
const fileSavedHandler = (e: SindriFilePayload): EventListener => {
  const detail = (e as CustomEvent<SindriFileSavedPayload>).detail
  if (detail && !detail.canceled) {
    fileSaved.value = true
  }

  return () => { }
}
// END Save functionality

// Reacción opcional al archivo abierto: cargamos el contenido
const fileOpenedHandler = (e: Event) => {
  const detail = (e as CustomEvent<SindriFilePayload>).detail
  if (detail && !detail.canceled) {
    const _markdownC = (detail.content?.toString() ?? '') || ''
    const _htmlC = marked(detail.content?.toString() ?? '') || ''
    const _fileP = (detail.path?.toString() ?? '') || ''
    emit('file-opened', _markdownC, _htmlC, _fileP)
  }
}

onMounted(() => {
  window.addEventListener('sindri-open-file', openHandler)
  window.addEventListener(
    'sindri-file-opened',
    fileOpenedHandler as EventListener
  )

  window.addEventListener('sindri-save-file', saveHandler as EventListener)
  window.addEventListener('sindri-save-as-file', saveAsHandler as EventListener)
  window.addEventListener('sindri-file-saved', HandleSindriFileSaved as EventListener)

  window.sindriServerStatic.onPreviewLoaded(HandleSindriServerStaticLoaded)

  if (server_static_preview.value) {
    webviewReady.value = true
    tryLoadPreviewIntoWebview()
  }
})

onUnmounted(() => {
  window.removeEventListener('sindri-open-file', openHandler)
  window.removeEventListener(
    'sindri-file-opened',
    fileOpenedHandler as EventListener
  )

  window.removeEventListener('sindri-save-file', saveHandler as EventListener)
  window.removeEventListener('sindri-save-as-file', saveAsHandler as EventListener)
  window.removeEventListener('sindri-file-saved', HandleSindriFileSaved as EventListener)
})
</script>
