<template>
  <div>
    <QuillEditor theme="snow" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../store/user'

// stores
const user = useUserStore()

function setUserCookies() {
  user.token = localStorage.getItem('token')
  user.user = JSON.parse(localStorage.getItem('user'))
}

onMounted(() => {
  setUserCookies()
})
</script>
