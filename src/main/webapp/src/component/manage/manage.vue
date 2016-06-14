<template>
  <div id="manage" class="line-small border bg-white">
    <h3 class="margin-top">{{msg}}</h3>
    <!-- <hr /> -->
    <div class="xs5">
      <web-type></web-type>
    </div>
    <div class="xs7">
      <web-detail></web-detail>
    </div>
  </div>
</template>

<script>
  import type from './type'
  import detail from './detail'
  export default {
    data () {
      return {
        msg: 'This is Manage container Module',
      }
    },
    components: {
      'web-type': type,
      'web-detail': detail
    },
    created () {

    },
    methods: {

    }
  }
</script>
