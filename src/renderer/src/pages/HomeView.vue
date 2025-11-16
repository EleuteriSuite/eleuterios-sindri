<template>
  <div class="grid grid-cols-12 gap-4 p-4">
    <div class="col-span-2">
      Título<br>
      slug<br>
      Fecha publicación<br>
      Estado: no publicado<br>
    </div>
    <div class="col-span-5">
      <div class="mt-3">Fichero abierto: <span v-html="filePath" />. Estado: <span v-if="fileSaved">Guardado</span><span v-else>Sin guardar</span></div>
      <QuillEditor
        theme="snow"
        class="mt-3 min-h-[40vh] max-h-[40vh] overflow-y-auto"
        v-model:content="htmlContent"
        contentType="html"
        @update:content="convertHTMLtoMarkdown"
      />
      <div class="h-[40vh]">
        Ariadna controls.
      </div>
    </div>
    <div class="col-span-5">
      Sindri preview
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
  fileSaved.value = false
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
