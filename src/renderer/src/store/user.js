import { defineStore } from 'pinia';
import Cookies from "js-cookie";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: '',
    accountParameter: 'demo',
    user: null,
  }),
  actions: {
    setToken(token) {
      localStorage.setItem('token', token);
      Cookies.set('token', token, {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.token = token
    },

    setUserToNull() {
      const userValue = '';
      localStorage.setItem('user', JSON.stringify(userValue));
      Cookies.set('user', JSON.stringify(userValue), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = userValue
    },

    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
      Cookies.set('user', JSON.stringify(user), {
        expires: 365, //60 * 60 * 24 * 365, // 1 year
        path: '/',
      })
      this.user = user
    },
  }
})
