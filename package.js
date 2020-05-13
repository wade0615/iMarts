import './src/index.js';
import './index.sass';
// import './style/index.css';


import Vue from 'vue'//引用npm載入的套件
import MyApp from './MyApp.vue'//引用自己的檔案

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<MyApp></MyApp>',
    components: { MyApp }
})