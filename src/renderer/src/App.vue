<template>
  <div class="w-full">
    <header class="py-2 w-full border-b-2" v-if="headerOpen">
      <div class="container px-4 mx-auto">
        <nav>
          <div class="flex justify-start items-center sm:space-x-12">
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
            <ul class="hidden sm:flex sm:ml-5 sm:items-center sm:w-auto sm:space-x-12">
              <li>
                <button
                  type="button"
                  class="font-medium text-sm cursor-pointer flex items-center gap-1"
                  @click="fileOpen = !fileOpen"
                >
                  File
                  <svg
                    class="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  :class="{ hidden: !fileOpen }"
                  class="absolute mt-3 w-40 bg-white border rounded shadow-lg z-50"
                >
                  <ul class="py-1 text-sm">
                    <li>
                      <OpenFile
                        @click="fileOpen = false"
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      />
                    </li>
                    <li>
                      <SaveFile
                        @click="fileOpen = false"
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      />
                    </li>
                    <li>
                      <SaveAsFile
                        @click="fileOpen = false"
                        class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      />
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <button
                  type="button"
                  class="font-medium text-sm cursor-pointer flex items-center gap-1"
                  @click="publishOpen = !publishOpen"
                >
                  Publish
                  <svg
                    class="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  :class="{ hidden: !publishOpen }"
                  class="absolute mt-3 w-40 bg-white border rounded shadow-lg z-50"
                >
                  <ul class="py-1 text-sm">
                    <li>
                      <div
                        class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                      >
                        Web
                      </div>
                    </li>
                    <li>
                      <div
                        class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                      >
                        Store
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <button
                  type="button"
                  class="font-medium text-sm cursor-pointer flex items-center gap-1"
                  @click="exportOpen = !exportOpen"
                >
                  Export
                  <svg
                    class="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <div
                  :class="{ hidden: !exportOpen }"
                  class="absolute mt-3 w-40 bg-white border rounded shadow-lg z-50"
                >
                  <ul class="py-1 text-sm">
                    <li>
                      <ExportHtmlFile
                        @click="exportOpen = false"
                        class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                      >
                        HTML
                      </ExportHtmlFile>
                    </li>
                    <li>
                      <ExportPdfFile
                        @click="exportOpen = false"
                        class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                      >
                        PDF
                      </ExportPdfFile>
                    </li>
                  </ul>
                </div>
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
                <button
                  type="button"
                  class="flex justify-between items-center w-full p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  @click="fileOpenMobile = !fileOpenMobile"
                >
                  <span>File</span>
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div v-if="fileOpenMobile" class="ml-4">
                  <OpenFile
                    @click="fileOpenMobile = false"
                    class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  />
                  <SaveFile
                    @click="fileOpenMobile = false"
                    class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  />
                  <SaveAsFile
                    @click="fileOpenMobile = false"
                    class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  />
                </div>
              </li>
              <li class="mb-1">
                <button
                  type="button"
                  class="flex justify-between items-center w-full p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  @click="publishOpenMobile = !publishOpenMobile"
                >
                  <span>Publish</span>
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div v-if="publishOpenMobile" class="ml-4">
                  <div
                    class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  >
                    Web
                  </div>
                  <div
                    class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  >
                    Store
                  </div>
                </div>
              </li>
              <li class="mb-1">
                <button
                  type="button"
                  class="flex justify-between items-center w-full p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  @click="exportOpenMobile = !exportOpenMobile"
                >
                  <span>Export</span>
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div v-if="exportOpenMobile" class="ml-4">
                  <ExportHtmlFile
                    @click="exportOpenMobile = false"
                    class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  >
                    HTML
                  </ExportHtmlFile>
                  <ExportPdfFile
                    @click="exportOpenMobile = false"
                    class="block cursor-pointer p-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded"
                  >
                    PDF
                  </ExportPdfFile>
                </div>
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
      :style="{ height: '100vh', overflow: 'auto' }"
    >
      <div>
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './store/user'
import { useSettingsStore } from './store/settings'
import OpenFile from './components/OpenFile.vue'
import SaveAsFile from '@renderer/components/SaveAsFile.vue'
import SaveFile from '@renderer/components/SaveFile.vue'
import ExportHtmlFile from '@renderer/components/ExportHtmlFile.vue'
import ExportPdfFile from '@renderer/components/ExportPdfFile.vue'

// stores
const user = useUserStore()
const settings = useSettingsStore()

// router
const router = useRouter()

// state (was data())
const mobileNavOpen = ref(false)

const fileOpen = ref(false)
const fileOpenMobile = ref(false)

const publishOpen = ref(false)
const publishOpenMobile = ref(false)

const exportOpen = ref(false)
const exportOpenMobile = ref(false)

const headerOpen = ref(true)

// methods -> functions
function switchNav() {
  mobileNavOpen.value = !mobileNavOpen.value
}

function openLink() {
  console.log('openLink')
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
