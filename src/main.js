const { ipcRenderer } = require('electron')

import { createApp } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHashHistory } from 'vue-router'
import ContextMenu from '@imengyu/vue3-context-menu'

import SplashScreen from './components/SplashScreen.vue'
import MainMenu from './components/MainMenu.vue'
import TravelScreen from './components/TravelScreen.vue'
import PlayScreen from './components/PlayScreen.vue'
import CharacterCreate from './components/CharacterCreate.vue'
import LocaleEditor from './components/dev/LocaleEditor.vue'

import Game from './engine/game.js'

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import "@/assets/global.css"

ipcRenderer.invoke('dev-mode?').then((devMode) => {
  const routes = [
    { path: '/menu', component: MainMenu, meta: { transition: 'fade' } },
    { path: '/splash', component: SplashScreen, meta: { transition: 'fade' } },
    { path: '/travel', component: TravelScreen },
    { path: '/play', component: PlayScreen },
    { path: '/create', component: CharacterCreate },
    { path: '/dev/locale-editor', component: LocaleEditor },
    { path: '/:pathMatch(./dev/*)', beforeEnter(to, from, next) {
      if (!devMode) {
        next('/menu')
      } else {
        next()
      }
    } },
    { path: '/:pathMatch(.*)', redirect: '/menu' }
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  const game = new Game()

  const app = createApp({})

  app.config.unwrapInjectedRef = true
  app.use(router)
  app.use(ContextMenu)
  app.provide('game', game)
  app.provide('devMode', devMode)
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
})
