<template>
  <div>
    <h1 class="w-full text-center">Sindri Notepad</h1>
    <div class="mt-3">Fichero abierto: <span v-html="filePath" /></div>
    <QuillEditor
      theme="snow"
      class="mt-3 h-[40vh]"
      v-model:content="htmlContent"
      contentType="html"
      @update:content="convertHTMLtoMarkdown"
    />
    <div class="h-[40vh]">
      Ariadna controls.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useUserStore } from '../store/user'
import { QuillEditor } from '@vueup/vue-quill'
import TurndownService from 'turndown'
import { fileOpenedHandler, openHandler } from '@renderer/utils/openFile'
import { fileSavedHandler, saveAsHandler, saveHandler } from '@renderer/utils/saveAsFile'

// stores
const user = useUserStore()

const fileSaved = ref(true)
const filePath = ref('')
const htmlContent = ref('')
const markdownContent = ref('')

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
})

function setUserCookies() {
  user.token = localStorage.getItem('token')
  user.user = JSON.parse(localStorage.getItem('user'))
}

function convertHTMLtoMarkdown() {
  // Forzar separación de párrafos en el HTML
  /*const htmlNormalizado = htmlContent.value
    // salto doble entre <p> consecutivos
    //.replace(/<\/p>\s*<p/gi, '</p>\n<p')
    // y también al final de cada </p>
    .replace(/<\/p>/gi, '</p>\n')*/

  //markdownContent.value = convert(htmlNormalizado)
  markdownContent.value = turndownService.turndown(htmlContent.value)
}

onMounted(() => {
  setUserCookies()
  window.addEventListener('sindri-open-file', openHandler)
  window.addEventListener(
    'sindri-file-opened',
    fileOpenedHandler(markdownContent, htmlContent, filePath) as EventListener
  )

  window.addEventListener(
    'sindri-save-file',
    saveHandler(filePath, markdownContent)
  )
  window.addEventListener(
    'sindri-save-as-file',
    saveAsHandler(markdownContent)
  )
  window.addEventListener(
    'sindri-file-saved',
    fileSavedHandler(fileSaved) as EventListener
  )
})

onUnmounted(() => {
  window.removeEventListener('sindri-open-file', openHandler)
  window.removeEventListener(
    'sindri-file-opened',
    fileOpenedHandler(markdownContent, htmlContent) as EventListener
  )

  window.removeEventListener(
    'sindri-save-file',
    saveHandler(filePath, markdownContent)
  )
  window.removeEventListener(
    'sindri-save-as-file',
    saveAsHandler(markdownContent)
  )
  window.removeEventListener(
    'sindri-file-saved',
    fileSavedHandler(fileSaved) as EventListener
  )
})
</script>
