<template>
  <div>
    <QuillEditor
      theme="snow"
      v-model:content="htmlContent"
      contentType="html"
      @update:content="convertHTMLtoMarkdown"
    />
    <div v-html="markdownContent" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { convert } from 'html-to-markdown'
import { useUserStore } from '../store/user'
import { QuillEditor } from '@vueup/vue-quill'
import { fileOpenedHandler, openHandler } from '@renderer/utils/openFile'

// stores
const user = useUserStore()

const htmlContent = ref('')
const markdownContent = ref('')

function setUserCookies() {
  user.token = localStorage.getItem('token')
  user.user = JSON.parse(localStorage.getItem('user'))
}

function convertHTMLtoMarkdown() {
  markdownContent.value = convert(htmlContent.value)
}

onMounted(() => {
  setUserCookies()
  window.addEventListener('sindri-open-file', openHandler)
  window.addEventListener(
    'sindri-file-opened',
    fileOpenedHandler(markdownContent, htmlContent) as EventListener
  )
})

onUnmounted(() => {
  window.removeEventListener('sindri-open-file', openHandler)
  window.removeEventListener(
    'sindri-file-opened',
    fileOpenedHandler(markdownContent, htmlContent) as EventListener
  )
})
</script>
