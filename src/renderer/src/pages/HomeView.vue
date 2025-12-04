<template>
  <div class="grid grid-cols-12 gap-4 p-4">
    <div class="col-span-2">
      <SindriOptions />
    </div>
    <div class="col-span-5">
      <SindriEditor
        v-model:markdownContent="markdownContent"
        v-model:htmlContent="htmlContent"
        :file-path="filePath"
        :file-saved="fileSaved"
        @html-to-markdown-converted="setFileToUpdate"
      />
    </div>
    <div class="col-span-5">
      <SindriPreview
        v-model:file-path="filePath"
        v-model:file-saved="fileSaved"
        :html-content="htmlContent"
        :markdown-content="markdownContent"
        @file-opened="setContentOpened"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '../store/user'
import SindriEditor from '@renderer/components/SindriEditor.vue'
import SindriPreview from '@renderer/components/SindriPreview.vue'
import SindriOptions from "@renderer/components/SindriOptions.vue";

// stores
const user = useUserStore()

const fileSaved = ref(true)
const filePath = ref('')

// Editor content
const markdownContent = ref('')
const htmlContent = ref('')

const setFileToUpdate = () => {
  fileSaved.value = false
}

const setContentOpened = (_markdownC, _htmlC, _fileP) => {
  markdownContent.value = _markdownC
  htmlContent.value = _htmlC
  filePath.value = _fileP
}

function setUserCookies() {
  user.token = localStorage.getItem('token')
  user.user = JSON.parse(localStorage.getItem('user'))
}

onMounted(() => {
  setUserCookies()
})
</script>
