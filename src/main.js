import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/prism.css'
import tdy from '@/components/myform'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('tdy', tdy)
new Vue({
  render: h => h(App)
}).$mount('#app')
