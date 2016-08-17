<template>
  <span>{{time}}</span>
</template>

<script>
  // tuntime only build 组件内不能使用template选项，即便是组件内构建子组件也不可以
  // 需要转换成单文件的形式使用子组件。
  // 使用vue.common.js的话，配合单文件组建，可以正常使用vue-router，vue-resource
  // vue插件，且配合webpack可以正常开启并使用hot模式
  // 对于2.0 , import Vue from 'vue' 载入的是vue.common.js, 该文件不包含编译模块
  // with 2.0, import Vue from 'vue/dist/vue' 载入的是vue.js, 其包含编译模块
  export default {
    data () {
      return {
        time: Date(),
      }
    },
    created () {
      setInterval(() => {
        this.time = Date()
      }, 1000)
    }
  }
</script>
