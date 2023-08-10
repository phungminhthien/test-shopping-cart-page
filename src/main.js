import Vue from 'vue'
import App from './App.vue'
import PopupLayer from 'vue-popup-layer'
import VueConfirmDialog from 'vue-confirm-dialog'
import { store } from './store/store'
import VueRouter from 'vue-router'
import Home from './view/Home.vue'
Vue.use(PopupLayer)
Vue.use(VueConfirmDialog)
Vue.use(VueRouter)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
const routers = [{
    name: 'Home',
    path: '/',
    component: Home
}]
const router = new VueRouter({ mode: 'history', routes: routers })
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})