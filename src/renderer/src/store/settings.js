import { defineStore } from 'pinia';
import Cookies from "js-cookie";

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    visorPort: null,
    visorTerminal: null,
  }),
  actions: {
    setVisorPort(port) {
      localStorage.setItem('visorPort', port);
      Cookies.set('visorPort', port, {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.visorPort = port
    },
    setVisorTerminal(terminal) {
      localStorage.setItem('visorTerminal', terminal);
      Cookies.set('visorTerminal', terminal, {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.visorTerminal = terminal
    },
  },
})
