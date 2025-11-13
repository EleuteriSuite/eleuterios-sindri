<template>
  <div>
    Home
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { useSettingsStore } from '../store/settings'
import { useServerMessageStore } from '../store/serverMessage'

// stores
const user = useUserStore()
const settings = useSettingsStore()

// router and axios
const router = useRouter()

function setUserCookies() {
  user.token = localStorage.getItem('token')
  user.user = JSON.parse(localStorage.getItem('user'))
}

onMounted(() => {
  setUserCookies()
  /*if (!user.token) {
    setTimeout(() => router.push({ path: '/login' }), 1000)
    return
  }*/
})
</script>
