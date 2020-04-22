import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import { initializeFirebase } from './firebaseConfig'
Vue.config.productionTip = false

// initializeFirebase()
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
