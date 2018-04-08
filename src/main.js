// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from './store'
import './js/flexible.js'

Vue.use(iView);

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$server = 'http://localhost:3000'

Axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
