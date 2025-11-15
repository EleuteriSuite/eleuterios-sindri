<template>
  <div class="w-full">
    <header class="py-2 w-full" v-if="headerOpen">
      <div class="container px-4 mx-auto">
        <nav>
          <div class="flex justify-between items-center">
            <a class="text-lg font-medium" href="#">
              <img class="h-7" src="./assets/icon.png" alt="" width="auto" />
            </a>
            <div class="sm:hidden">
              <button @click="switchNav()" class="flex items-center p-3 hover:bg-gray-50 rounded">
                <svg class="block h-4 w-4" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
            </div>
            <ul class="hidden sm:flex sm:ml-auto sm:mr-12 sm:items-center sm:w-auto sm:space-x-12">
              <li>
                <a class="font-medium text-sm cursor-pointer" @click="openAriadna()">Ariadna</a>
              </li>

              <li>
                <OpenFile class="font-medium text-sm" />
              </li>

              <li>
                <RouterLink @click="openLink()" to="/" class="font-medium text-sm">
                  Home
                </RouterLink>
              </li>

              <li>
                <a v-if="user" @click="logout()" class="font-medium text-sm cursor-pointer">
                  Logout
                </a>
                <RouterLink
                  @click="openLink()"
                  v-if="!user"
                  to="/login"
                  class="font-medium text-sm"
                >
                  Login
                </RouterLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        :class="{ block: mobileNavOpen, hidden: !mobileNavOpen }"
        class="fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50"
      >
        <div @click="switchNav()" class="fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav
          class="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto scrollable"
        >
          <div class="flex items-center mb-8">
            <a class="mr-auto text-2xl font-medium leading-none" href="#">
              <img class="h-7" src="./assets/icon.png" alt="" width="auto" />
            </a>
            <button @click="switchNav()">
              <svg
                class="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewbox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li class="mb-1">
                <a
                  class="block cursor-pointer p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  @click="openAriadna()"
                  >Ariadna</a
                >
              </li>

              <li class="mb-1">
                <OpenFile class="block cursor-pointer p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded" />
              </li>

              <li class="mb-1">
                <RouterLink
                  @click="openLink()"
                  to="/"
                  class="block p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                >
                  Home
                </RouterLink>
              </li>

              <li class="mb-1">
                <a
                  v-if="user"
                  @click="logout()"
                  class="block cursor-pointer p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                >
                  Logout
                </a>
                <RouterLink
                  @click="openLink()"
                  v-if="!user"
                  to="/login"
                  class="block p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                >
                  Login
                </RouterLink>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <p class="mt-6 mb-4 text-sm text-center text-gray-500">
              <span>© <span v-html="new Date().getFullYear()" /> License MIT and BSD-3.</span>
            </p>
          </div>
        </nav>
      </div>
    </header>

    <main
      class="scrollable"
      :class="{ 'w-full': true }"
      :style="{ height: '100vh', overflow: 'auto', 'padding-bottom': ariadnaOpen ? '0' : '0' }"
    >
      <div v-if="ariadnaOpen" style="width: 100%; height: 100%">
        <webview
          src="https://software.eleuterios.org/"
          style="width: 100%; height: 100%"
          partition="persist:webview_session"
        >
        </webview>
      </div>
      <div v-else>
        <RouterView />
      </div>
    </main>

    <div class="floating-menu" v-if="ariadnaOpen" @click="headerOpen = !headerOpen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="white"
      >
        <path
          d="M3 6h18M3 12h18M3 18h18"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user'
import { useSettingsStore } from './store/settings'
import OpenFile from './components/OpenFile.vue'

// stores
const user = useUserStore()
const settings = useSettingsStore()

// router
const router = useRouter()

// state (was data())
const mobileNavOpen = ref(false)
const headerOpen = ref(true)
const ariadnaOpen = ref(false)

// methods -> functions
function switchNav() {
  mobileNavOpen.value = !mobileNavOpen.value
}

function openAriadna() {
  ariadnaOpen.value = true
  headerOpen.value = false
}

function openLink() {
  ariadnaOpen.value = false
}

function setUserCookies() {
  user.token = localStorage.getItem('token')
  user.user = JSON.parse(localStorage.getItem('user'))
  settings.visorPort = localStorage.getItem('visorPort')
  settings.visorTerminal = localStorage.getItem('visorTerminal')
}

function logout() {
  user.setToken('')
  user.setUserToNull()
  openLink()
  setTimeout(() => router.push({ path: '/login' }), 1000)
}

// lifecycle
onMounted(() => {
  setUserCookies()
})
</script>

<style>
/* SCROLL THEME */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #6c8894;
}
</style>
