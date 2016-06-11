<template>
  <div id="login" class="text-left lrMod">
      <h1>Login</h1>
      <div style="height: 10px"></div>
      <input class="input" type="text" placeholder="用户名" v-model="name" data-asv="required:必填">
      <div style="height: 10px"></div>
      <input class="input" type="password" placeholder="密码" v-model="pwd" data-asv="required:必填">
      <div style="height: 10px"></div>
      <input class="input" type="text" placeholder="验证码" v-model="code" data-asv="required:必填">
      <div style="height: 10px"></div>
      <button class="button bg-sub" type="button" @click="login">登录</button>
      <img @click="imgReload($event)" id="kaptchaImage" src="/ACGN/api.getKaptchaImage.acgn" class="border border-blue" style="width: 125px; height: 42px; margin-left: 45px;" />
  </div>
</template>

<script>
  import Asv from 'asv'
  import {getEventBus} from '../vuex/getters'
  export default {
    data () {
      return {
        name: '',
        pwd: '',
        code: ''
      }
    },
    created () {
      this.initCheck();//检查是否已初始化用户
    },
    //注意ready和attached 区别,
    ready () {//组件dom就绪后绑定表单相关元素
      Asv.autoValidateBind('#login', '', 'border-red');
    },
    vuex: {
      getters: {
        eventBus: getEventBus,//事件总线对象，全局性控制vue自定义事件
      }
    },
    methods: {
      initCheck () {
          this.$http.get('/ACGN/api.initCheck.acgn').then(
            function (response) {
              this.$route.router.go(response.data.path); //切换组件
            },
            function (response) {
              alert("app Module initCheck Error: " + response.statusText);
            }
          )
      },
      login () {
        if (Asv.checkAll('#login')) {
          this.loginImpl(this);
        }
      },
      loginImpl () {
        let name = this.name;
        let pwd = this.pwd;
        let code = this.code;
        let pwdMD5 = $.md5($.md5($.md5(name + pwd)) + code);
        let codeMD5 = $.md5(this.code.toLocaleLowerCase());
        const param = {
          name: name,
          pwd: pwdMD5,
          code: codeMD5
        };
        this.$http.post('/ACGN/api.login.acgn', param).then(
          function (response) {
            if (response.data.infoFlag == '登陆成功') {
              this.eventBus.$emit('login-success', response.data.path);
            } else {
              alert(response.data.infoFlag);
            }
          },
          function (response) {
            alert('Login Module loginImpl Error: ' + response.statusText);
          }
        )
      },
      imgReload (event) {
          $(event.target).hide().attr('src', '/ACGN/api.getKaptchaImage.acgn?' + Math.floor(Math.random() * 100)).fadeIn();
      }
    }
  }
</script>
