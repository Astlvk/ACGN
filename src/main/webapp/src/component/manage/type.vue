<template>
  <div id="type" class="border padding margin">
    <div>
      <h4 class="float-left">站点类型</h4>
      <div class="float-right">
        <div class="form-inline">
          <div class="form-group">
            <div class="field">
              <input v-model="search" class="input input-small" type="text" placeholder="webTypeName"/>
            </div>
          </div>
          <div class="form-button">
            <button @click="clear" class="button button-small" type="button">clear</button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="table-responsive">
      <table class="table margin-top">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>操作</td>
          </tr>
          <tr>
            <td colspan="2">
              <input v-model="name" @keyup.enter="add(name)" class="input input-small" type="text" placeholder="Name" maxlength="30">
            </td>
            <td>
              <button @click="add(name)" class="button button-small" type="button" >Add</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type of arr">
            <td>{{type.id}}</td>
            <td>
              <input v-model="type.name" @change="update(type)" class="input input-small" type="text" maxlength="30"/>
            </td>
            <td>
              <button @click="del(type)" class="button button-little" type="button">Del</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <ul class="pagination pagination-group pagination-small">
                <li><a @click="begin" href="javascript:;">首页</a></li>
                <li><a @click="up" href="javascript:;">上一页</a></li>
                <li><a @click="dn" href="javascript:;">下一页</a></li>
                <li><a @click="end" href="javascript:;">末页</a></li>
              </ul>
            </td>
            <td>
              {{currPage}}/{{allPage}}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Type Module',
        search: '',
        name: '',
        rows: 0,
        currPage: 1,
        allPage: 0,
        pageSize: 6,
      }
    },
    computed: {
      eventBus () {
        return this.$store.getters.eventBus
      },
      webTypes () {
        return this.$store.getters.webTypes
      },
      arr () {
        let newArr = [];
        if (this.search) {//不为空开始过滤
          newArr = this.webTypes.filter(function (item) {//注意this指向, 可以直接箭头函数
            let lcA = item.name.toLocaleLowerCase();
            let lcB = this.search.toLocaleLowerCase();
            return lcA.indexOf(lcB) > -1;
          }, this);
        } else {
          newArr = this.webTypes;
        }
        this.rows = newArr.length;
        this.allPage = this.rows % this.pageSize == 0 ? this.rows / this.pageSize : Math.floor(this.rows / this.pageSize + 1);
        if (this.currPage < 1) {
          this.currPage = 1;
        } else if (this.currPage > this.allPage && this.allPage > 0) {
          this.currPage = this.allPage;
        }
        let offset = (this.currPage - 1) * this.pageSize;
        return newArr.slice(offset, offset + this.pageSize);
      },
    },
    created () {
      this.initInfo();
    },
    methods: {
      initInfo () {
        this.$store.dispatch('initInfo')
      },
      add (name) {
        this.$store.dispatch('add', name).then(() => {this.name = ''})
      },
      update (type) {
        this.$store.dispatch('update', type)
      },
      del (type) {
        this.$store.dispatch('del', type).then(() => {
          this.eventBus.$emit('webTypeDelSuccess')
        })
      },
      test () {
        alert(JSON.stringify(this.webTypes));
      },
      clear () {
        this.search = '';
      },
      begin () {
        this.currPage > 1 ? this.currPage = 1 : {};
      },
      up () {
        this.currPage > 1 ? this.currPage-- : {};
      },
      dn () {
        this.currPage < this.allPage ? this.currPage++ : {};
      },
      end () {
        this.currPage < this.allPage ? this.currPage = this.allPage : {};
      },
    },
  }
</script>
