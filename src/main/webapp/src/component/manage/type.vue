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
          <tr v-for="type of webTypes | filterBy search in 'name' | myFilter | limitBy pageSize offset">
            <td>{{type.id}}</td>
            <td>
              <input v-model="type.name" @change="update(type, $event)" class="input input-small" type="text" maxlength="30"/>
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
  import {getEventBus, getWebTypes} from '../../vuex/getters'
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
      offset () {
        //这里主要就是根据currPage生成下offset, 然后交给v-for 和 过滤器处理dom
        //这里因为父组件传来的webType默认值是null，所以第一次传进来的时候调用webType的相关属性方法或报错。
        // 同样适用limitBy过滤webType报空指针的原因也在这里。
        let rows = this.rows;
        this.allPage = rows % this.pageSize == 0 ? rows / this.pageSize : Math.floor(rows / this.pageSize + 1);
        if (this.currPage < 1) {
          this.currPage = 1;
        } else if (this.currPage > this.allPage && this.allPage > 0) {
          this.currPage = this.allPage;
        }
        return (this.currPage - 1) * this.pageSize;
      }
    },
    created () {
      this.initInfo();
    },
    vuex: {
      getters: {
        eventBus: getEventBus,
        webTypes: getWebTypes,
      },
      actions: {
        initInfo ({dispatch}) {
          this.$http.get('/ACGN/mapi/api.getAllType.acgn').then(
            (response) => {
              dispatch('UPDATEWEBTYPES', response.data.webTypes);
            },
            (response) => {
              alert('WebType Module initInfo() Error: ' + response.statusText);
            }
          )
        },
        add ({dispatch}, name) {
          if (name) {
            this.$http.post(
              '/ACGN/mapi/api.addWebType.acgn',
              {name: name}
            ).then(
              function (response) {
                response.data.infoFlag == 'addFailed' ? alert(response.data.infoFlag) : (
                    dispatch('ADDWEBTYPE', {id: response.data.id, name: name}),
                    this.name = ''
                );
              },
              function (response) {
                alert('WebType Module add() Error: ' + response.statusText)
              });
          } else {
            alert('not null');
          }
        },
        update ({dispatch}, type, e) {
          this.$http.post(
            '/ACGN/mapi/api.updateWebTypeById.acgn',
            {id: type.id, name: e.target.value}
          ).then(
            function (response) {
              response.data == 'updateFailed' ? alert(response.data) : dispatch('UPDATEWEBTYPE', type.id, e.target.value);
            },
            function (response) {
              alert("WebType Module update() Error: " + response.statusText);
            }
          )
        },
        del ({dispatch}, type) {
          this.$http.post(
            '/ACGN/mapi/api.delWebTypeById.acgn',
            {id: type.id}
          ).then(
            function (response) {
              response.data == 'delFailed' ? alert(response.data) : (
                dispatch('DELWEBTYPE', type),
                this.eventBus.$emit('webTypeDelSuccess')
              );
            },
            function (response) {
              alert("WebType Module del() Error: " + response.statusText);
            }
          )
        },
      }
    },
    methods: {
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
    filters: {
      //中转过滤器，主要是想用于把filterBy过滤的结果转存入当前vm管理的属性中,以供能数据驱动视图
      myFilter (arr) {
        this.rows = arr.length;
        return arr;
      }
    }
  }
</script>
