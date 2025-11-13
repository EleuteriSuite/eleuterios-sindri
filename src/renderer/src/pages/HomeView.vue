<template>
  <div>
    <QuillEditor theme="snow" v-model:content="htmlContent" contentType="html" @update:content="convertHTMLtoMarkdown" />
    <div v-html="markdownContent" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { convert } from 'html-to-markdown'
import { useUserStore } from '../store/user'
import { QuillEditor } from '@vueup/vue-quill'

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
})
</script>
