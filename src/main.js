const { ipcRenderer } = require('electron')

import { createApp } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHashHistory } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import MainMenu from './components/MainMenu.vue'
import TravelScreen from './components/TravelScreen.vue'
import PlayScreen from './components/PlayScreen.vue'
import CharacterSelect from './components/CharacterSelect.vue'
import CharacterCreate from './components/CharacterCreate.vue'
import Game from './engine/game.js'

import "@/assets/global.css"

const routes = [
  { path: '/menu', component: MainMenu, meta: { transition: 'fade' } },
  { path: '/splash', component: SplashScreen, meta: { transition: 'fade' } },
  { path: '/load', component: CharacterSelect },
  { path: '/travel', component: TravelScreen },
  { path: '/play', component: PlayScreen },
  { path: '/create', component: CharacterCreate }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const game = new Game()

const app = createApp({})
app.use(router)
app.provide('game', game)
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
