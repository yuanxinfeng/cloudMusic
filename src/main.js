/*
 * @Description: 
 * @Author: Jasper
 * @Github: https://github.com/yuanxinfeng
 * @Date: 2020-03-20 14:39:02
 * @LastEditors: Jasper
 * @LastEditTime: 2020-03-24 10:01:54
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "./assets/theme/index.css";
Vue.use(ElementUI);

import resize from "@/mixins/resize";

import filters from "./filter/index";
//过滤器统一处理加载
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;
new Vue({
  mixins:[resize],
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
