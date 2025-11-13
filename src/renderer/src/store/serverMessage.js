import { defineStore } from 'pinia';

export const useServerMessageStore = defineStore('serverMessageStore', {
  state: () => ({
    serverMessage: '',
    serverMessageTimeout: null,
  }),
  actions: {
    setServerMessage(serverMessage) {
      this.serverMessage = serverMessage
      this.serverMessageTimeout = setTimeout(() => { this.serverMessage = '' }, 5000)
    },
  },
})
