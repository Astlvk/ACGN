/**
 * vue应用webpack打包入口
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import app from './component/app'
import login from './component/login'
import reg from './component/reg'

Vue.use(VueRouter);
Vue.use(VueResource);

// Vue.http.headers.common['content-Type'] = 'application/json';
// Vue.http.headers.common['content-Type'] = 'application/x-www-form-urlencoded';
Vue.http.options.emulateJSON = true;
const router = new VueRouter({
  transitionOnLoad: true
});

router.map({
	'/': {
    component: login
  },
  '/login': {
    component: login
  },
  '/reg': {
    component: reg
  },
  '/manage': {
    component: function (resolve) {
      require.ensure(['./component/manage/manage'], function (require) {
        var manage = require('./component/manage/manage');
        resolve(manage);
      }, 'manage');
    }
  }
});

router.start(app, '#app');
