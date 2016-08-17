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
  import store from './vuex/store'
  import countTime from './countTime'
  export default {
      store,
      data () {
        return {
            msg: 'This is Root container Module',
            time: Date(),
            view: 'v-a'
        };
      },
      computed: {
        eventBus () {
          return this.$store.getters.eventBus
        }
      },
      created () {
        // console.log(this.$route);
        this.eventBus.$on('login-success', (msg) => this.$router.push(msg));
        this.eventBus.$on('reg-success', () => this.$router.push('/login'));
      },
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
