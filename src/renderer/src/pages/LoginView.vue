<template>
  <section class="relative py-20 bg-gray-50">
    <img class="hidden lg:block absolute top-0 left-0 mt-16 z-10" src="../assets/blue-dot-left-bars.svg" alt="">
    <div class="absolute top-0 left-0 lg:bottom-0 h-128 lg:h-auto w-full lg:w-8/12 bg-white"></div>
    <div class="relative container px-4 mx-auto">
      <div class="flex flex-wrap items-center mx-4">
        <div class="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
          <div class="max-w-lg">
            <h2 class="mb-10 text-4xl font-semibold font-heading">Sindri Notepad</h2>
            <p class="text-xl text-gray-500">Publish webs, pdfs, presentations and apps.</p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-4">
          <div class="lg:max-w-md p-6 lg:px-10 lg:py-12 bg-white text-center border rounded-xl">
            <span class="inline-block mb-4 text-xs text-blue-400 font-semibold">Sign In</span>
            <h3 class="mb-12 text-3xl font-semibold font-heading">Login to sindri</h3>
            <div class="relative flex flex-wrap mb-6">
              <input class="relative mb-2 md:mb-0 w-full py-4 pl-4 text-sm border rounded" type="email" placeholder="admin@eleuterios.org" v-model="signInData.email">
              <span class="absolute top-0 left-0 ml-4 -mt-2 px-1 inline-block bg-white text-gray-500 text-xs">Email</span>
            </div>
            <div class="relative flex flex-wrap mb-6">
              <input class="relative mb-2 md:mb-0 w-full py-4 pl-4 text-sm border rounded" type="password" placeholder="******" v-model="signInData.password">
              <span class="absolute top-0 left-0 ml-4 -mt-2 px-1 inline-block bg-white text-gray-500 text-xs">Password</span>
            </div>
            <button class="w-full inline-block py-4 text-sm text-white font-medium leading-normal bg-gray-800 hover:bg-black rounded transition duration-200" @click="login()">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { useSettingsStore } from '../store/settings'
import { useServerMessageStore } from '../store/serverMessage'

const user = useUserStore()
const settings = useSettingsStore()
const serverMessage = useServerMessageStore()

const router = useRouter()
const { appContext } = getCurrentInstance()
const $axios = appContext.config.globalProperties.$axios

const signInData = reactive({
  email: '',
  password: '',
  device_name: 'windows'
})

function setUserCookies() {
  user.token = localStorage.getItem('token')
  user.user = JSON.parse(localStorage.getItem('user'))
  settings.port = localStorage.getItem('port')
}

function afterLogin(responseData) {
  user.setToken(responseData.token)
  user.setUser(responseData)
  router.push('/')
}

async function login() {
  try {
    const response = await $axios.post(`/${user.accountParameter}/login`, signInData, {
      headers: { 'Content-Type': 'application/json' }
    })
    const responseData = response.data
    if (responseData.token) {
      afterLogin(responseData)
    } else {
      serverMessage.serverMessage = responseData
    }
  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta del servidor:', error.response.status)
      if (error.response.data === 'The given data was invalid.') {
        serverMessage.serverMessage = 'Datos inválidos.'
      } else {
        serverMessage.serverMessage = 'Error.'
      }
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request)
    } else {
      console.error('Error al configurar la solicitud:', error.message)
    }
  }
}

onMounted(() => {
  setUserCookies()
  if (user.token) {
    setTimeout(() => router.push({ path: '/' }), 1000)
  }
})
</script>
