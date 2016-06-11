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
</style>

<template>
  <div>
      <h1>{{msg}}</h1>{{time}}
      <button @click="handover" type="button" class="button button-little">handover</button>
      <hr />
      <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import {getEventBus} from '../vuex/getters'
  export default {
      store,
      data () {
        return {
            msg: 'This is Root container Module',
            time: new Date()
        };
      },
      created () {
        this.countTime();
        this.eventBus.$on('login-success', (msg) => this.$route.router.go(msg));
        this.eventBus.$on('reg-success', () => this.$route.router.go('/login'));
      },
      vuex: {
        getters: {
          eventBus: getEventBus,
        }
      },
      methods: {
          handover () {
            let route = this.$route;
            let path = route.path;
            path == '/login' || path == '/' ? path = '/reg' : path = '/login';
            route.router.go(path);
          },
          countTime () {
            setInterval(() => {
              this.time = new Date();
            }, 1000);
          }
      },
      transitions: {
          fade: {
              enterClass: 'fadein-right',
              leaveClass: 'fadeout-left'
              // enterClass: 'bouncein',
              // leaveClass: 'bounceout'
          }
      }
  }
</script>
