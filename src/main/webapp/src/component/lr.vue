<style>
  .lrMod {
      max-width: 300px;
      padding: 19px 29px 29px;
      margin: 40px auto 20px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
      -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
      box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
  }

  [v-cloak] {
      display: none;
  }
</style>

<template>
  <div class="lrMod" v-cloak>
      <h1>{{msg}}</h1>
      <button type="button" class="button button-little" @click="click">切换</button>
      <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  module.exports = {
      data: function() {
          return {
              msg: 'This is LR Module',
              E: '',
              M: ''
          };
      },
      created: function() {
        this.initCheck(this);
      },
      methods: {
          click: function() {
              var route = this.$route;
              var path = route.path;
              path == '/lr/login' || path == '/lr' ? route.router.go('/lr/reg') : route.router.go('/lr/login');
          },
          initCheck: function(lrVM) {
              $.ajax({
                  url: "/ACGN/initCheck.acgn",
                  type: "get",
                  data: null,
                  dataType: "json",
                  success: function(data) {
                      var path = '';
                      'reg' == data[0] ? path = '/lr/reg' : path = '/lr/login'
                      lrVM.$route.router.go(path) //切换组件
                      lrVM.E = data[1]; //公共指数
                      lrVM.M = data[2]; //模数
                  },
                  error: function(xhr, msg, errobj) {
                      alert("lrModule Error: " + msg);
                  }
              });
          },
      },
      transitions: {
          fade: {
              enterClass: 'rotatein',
              leaveClass: 'rotateout'
          }
      }
  }
</script>
