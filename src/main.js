//导入createApp模块
//作用：创建一个vue的应用
import { createApp } from 'vue'
import './main.css'
import localforage from "localforage";
import defaultSetting from "../config/setting.json"

localforage.getItem('setting').then(res => {
    // console.log(res);
    if (!res) return localforage.setItem("setting", defaultSetting);
}).catch(err => {
    console.log(err);
});

//组件：具备HTML+CSS+JS的一个HTML片段（vue自己定义的一种组织html、css、js的一种文件格式）
//作用：替代现有的html文件+css文件+js文件组织代码的方式
//规范：
import App from './App.vue'

createApp(App).mount('#app')
