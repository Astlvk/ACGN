<style>
  .selectWidth {
    width: auto;
  }
</style>
<template>
  <div id="type" class="border padding margin">
    <div>
      <h4 class="float-left">站点详细</h4>
      <div class="float-right">
        <div class="form-inline">
          <div class="form-group">
            <div class="field">
              <select v-model="searchType" class="input input-small">
                <option value="0">请选择</option>
                <option v-for="type of webTypes" :value="type.id">{{type.name}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <div class="field">
              <input v-model="searchName" class="input input-small" type="text" placeholder="websiteName" maxlength="30"/>
            </div>
          </div>
          <div class="form-button">
            <button @click="search" class="button button-small" type="button">search</button>
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
            <td>类型</td>
            <td>Url</td>
            <td>图片</td>
            <td>介绍</td>
            <td>操作</td>
          </tr>
          <tr>
            <td colspan="6">
              <input v-model="name" @keyup.enter="add" class="input input-small" placeholder="Name" maxlength="30">
            </td>
            <td>
              <button @click="add" class="button button-small" type="button">Add</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="web of webs" @change="update(web)">
            <td>{{web.id}}</td>
            <td>
              <input v-model="web.name" class="input input-small" type="text" maxlength="30"/>
            </td>
            <td>
              <select v-model="web.typeId" class="input input-small selectWidth">
                <option v-for="type of webTypes" :value="type.id">{{type.name}}</option>
              </select>
            </td>
            <td>
              <input v-model="web.url" class="input input-small" type="text" maxlength="300"/>
            </td>
            <td>
              <input v-model="web.imgUrl" class="input input-small" type="text" maxlength="300"/>
            </td>
            <td>
              <input v-model="web.introduce" class="input input-small" type="text" maxlength="150"/>
            </td>
            <td>
              <button @click="del(web)" class="button button-little" type="button">Del</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6">
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
        msg: 'siteDetail Module',
        webDetails: [],
        name: '',
        pageSize: 6,
        searchType: 0,
        searchName: '',
        searchFlag: false
      }
    },
    computed: {
      row () {
        return this.webDetails.rows;
      },
      currPage: {
        get () {
          return this.webDetails.currPage;
        },
        set (val) {
          this.webDetails.currPage = val;
        }
      },
      allPage () {
        return this.webDetails.allPage;
      },
      webs () {
        return this.webDetails.list;
      }
    },
    created () {
      this.initInfo();
      this.eventBus.$on('webTypeDelSuccess', () => this.getPagination());
    },
    vuex: {
      getters: {
        eventBus: getEventBus,
        webTypes: getWebTypes,
      }
    },
    methods: {
      test () {
        alert(this.typeId);
      },
      getPagination () {//从服务器获取分页
        const param = {};
        this.searchFlag == false ?
        Object.assign(param, {currPage: this.currPage, pageSize: this.pageSize}) :
        Object.assign(param, {currPage: this.currPage, pageSize: this.pageSize, typeId: this.searchType, name: this.searchName})
        this.$http.post(
          '/ACGN/mapi/api.getWebsitePagination.acgn',
          param
        ).then(
          function (response) {
            this.webDetails = response.data;
          },
          function (response) {
            alert('WebDetails Module getPagination() Error: ' + response.statusText);
          }
        )
      },
      initInfo () {
        this.currPage = 1;
        this.getPagination();
      },
      search () {
        this.searchFlag = true;
        this.currPage = 1;
        this.getPagination();
      },
      clear () {
        this.searchFlag = false;
        this.currPage = 1;
        this.searchType = 0;
        this.searchName = '';
        this.getPagination();
      },
      begin () {
        this.currPage > 1 ? (this.currPage = 1, this.getPagination()) : {};
      },
      up () {
        this.currPage > 1 ? (this.currPage--, this.getPagination()) : {};
      },
      dn () {
        this.currPage < this.allPage ? (this.currPage++, this.getPagination()) : {};
      },
      end () {
        this.currPage < this.allPage ? (this.currPage = this.allPage, this.getPagination()) : {};
      },
      add () {
        if (this.name) {
          this.$http.post(
            '/ACGN/mapi/api.addWebsiteOnlyName.acgn',
            {name: this.name}
          ).then(
            function (response) {
              this.name = '';
              response.data == 'addSuccess' ? this.getPagination() : alert(response.data);
            },
            function (response) {
              alert('WebDetails Module add() Error: ' + response.statusText);
            }
          );
        } else {
          alert('not null');
        }
      },
      del (web) {
        this.$http.post(
          '/ACGN/mapi/api.delWebsiteById.acgn',
          {id: web.id}
        ).then(
          function (response) {
            response.data == 'delSuccess' ? this.getPagination() : alert(response.data);
          },
          function (response) {
            alert('WebDetails Module del() Error: ' + response.statusText);
          }
        )
      },
      update (web) {//时间类型真的讨厌
        if (web.name) {
          this.$http.post(
            '/ACGN/mapi/api.updateWebsiteById.acgn',
            {
              id: web.id,
              typeId: web.typeId,
              name: web.name,
              url: web.url,
              imgUrl: web.imgUrl,
              introduce: web.introduce
            }
          ).then(
            function (response) {
              response.data == 'updateFailed' ? alert(response.data) : {};
            },
            function (response) {
              alert('WebDetails Module update() Error: ' + response.statusText);
            }
          )
        } else {
          alert('name 不能为空, 更新失败');
        }
      }
    },
  }
</script>
