<template>
  <div id="reg" class="text-left lrMod">
      <h1>Reg</h1>
      <div style="height: 10px"></div>
      <input class="input" type="text" placeholder="用户名" maxlength="16" v-model="name" data-asv="nameFormat:用户名格式错误">
      <div style="height: 10px"></div>
      <input class="input" type="password" name="pwd" placeholder="密码" maxlength="16" v-model="pwd" data-asv="pwdFormat:密码格式错误">
      <div style="height: 10px"></div>
      <input class="input" type="password" placeholder="再次输入密码" maxlength="16" v-model="rePwd" data-asv="required:必填;repwd#pwd:密码不同">
      <div style="height: 10px"></div>
      <input class="input" type="text" placeholder="验证码" maxlength="4" v-model="code" data-asv="required:必填">
      <div style="height: 10px"></div>
      <button class="button bg-sub" type="button" @click="reg">注册</button>
      <img @click="imgReload($event)" id="kaptchaImage" src="/ACGN/api.getKaptchaImage.acgn" class="border border-blue" style="width: 125px; height: 42px; margin-left: 45px;" />
  </div>
</template>

<script>
  import 'jquery.md5'
  import 'security'
  import Asv from 'asv'
  import {getEventBus} from '../vuex/getters'
  export default {
    data () {
      return {
        name: '',
        pwd: '',
        rePwd: '',
        code: '',
        E: '',
        M: ''
      };
    },
    created () {
      this.getEM();
    },
    ready () {
      Asv.autoValidateBind('#reg', '', 'border-red');
    },
    vuex: {
      getters: {
        eventBus: getEventBus
      }
    },
    methods: {
      reg: function() {
          if (Asv.checkAll('#reg')) {
              this.regImpl();
          }
      },
      regImpl () {
          let codeMD5 = $.md5(this.code.toLocaleLowerCase());
          let pwdMD5 = $.md5($.md5(this.name + this.pwd));
          let cipherText = this.RSAE(pwdMD5);
          const param = {
              name: this.name,
              pwd: cipherText,
              code: codeMD5
          };
          this.$http.post('/ACGN/api.reg.acgn', param).then(
            function (response) {
              alert(response.data.infoFlag);
              if (response.data.infoFlag == '注册成功') {
                  this.eventBus.$emit('reg-success');
              }
            },
            function (response) {
              alert('Reg Module regImpl Error: ' + response.statusText);
            }
          )
      },
      RSAE (clearText) {
          let publicKey = RSAUtils.getKeyPair(this.E, '', this.M);
          let cipherText = RSAUtils.encryptedString(publicKey, clearText);
          return cipherText;
      },
      getEM () {
          this.$http.get('/ACGN/api.getEM.acgn').then(
            function (response) {
              this.E = response.data.E;
              this.M = response.data.M;
            },
            function (response) {
              alert('Reg Module getEM Error: ' + response.statusText);
            }
          )
      },
      imgReload (event) {
          $(event.target).hide().attr('src', '/ACGN/api.getKaptchaImage.acgn?' + Math.floor(Math.random() * 100)).fadeIn();
      }
    }
  }
</script>
