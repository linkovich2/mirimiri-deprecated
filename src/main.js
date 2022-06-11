const { ipcRenderer } = require('electron')

import { createApp } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHashHistory } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import MainMenu from './components/MainMenu.vue'

const routes = [
  { path: '/menu', component: MainMenu, meta: { transition: 'fade' } },
  { path: '/splash', component: SplashScreen, meta: { transition: 'fade' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp({})
app.use(router)
app.mount('#app')

ipcRenderer.invoke('get-settings').then((settings) => {
  if (settings.skip_splash) {
    router.push('/menu')
  } else {
    router.push('splash')
    ipcRenderer.invoke('update-settings', {
      skip_splash: true
    })
  }
})
