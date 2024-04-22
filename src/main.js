import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from '@/store/vuex'

const app = createApp(App).use(router)
app.use(vuetify)
app.use(store)
app.mount('#app')

window.Kakao.init("a25065da4bb3c19c7bf0effe59e8ff0e");