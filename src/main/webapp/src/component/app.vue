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
    <h1>{{msg}}</h1>
    <count-time></count-time>
    <button @click="handover" type="button" class="button button-little">handover</button>
    <hr />
    <transition mode="out-in"
      appear
      appear-active-class="fadein-right"
      enter-active-class="fadein-right"
      leave-active-class="fadeout-left">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  // import store from '../vuex/store'
  // import {getEventBus} from '../vuex/getters'
  import countTime from './countTime'
  export default {
      // store,
      data () {
        return {
            msg: 'This is Root container Module',
            time: Date(),
            view: 'v-a'
        };
      },
      created () {
        console.log(this.$route);
        // this.eventBus.$on('login-success', (msg) => this.$route.router.go(msg));
        // this.eventBus.$on('reg-success', () => this.$route.router.go('/login'));
      },
      // vuex: {
      //   getters: {
      //     eventBus: getEventBus,
      //   }
      // },
      components: {
        countTime,
      },
      methods: {
          handover () {
            let path = this.$route.path;
            path == '/login' || path == '/' ? path = '/reg' : path = '/login';
            this.$router.push(path);
          },
      }
  }
</script>
