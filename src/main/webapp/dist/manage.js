webpackJsonp([1],{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\component\\manage\\manage.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./manage.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _type = __webpack_require__(26);

	var _type2 = _interopRequireDefault(_type);

	var _detail = __webpack_require__(29);

	var _detail2 = _interopRequireDefault(_detail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//   <div id="manage" class="line-small border bg-white">
	//     <h3 class="margin-top">{{msg}}</h3>
	//     <!-- <hr /> -->
	//     <div class="xs5">
	//       <web-type></web-type>
	//     </div>
	//     <div class="xs7">
	//       <web-detail></web-detail>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>
	exports.default = {
	  data: function data() {
	    return {
	      msg: 'This is Manage container Module'
	    };
	  },

	  components: {
	    'web-type': _type2.default,
	    'web-detail': _detail2.default
	  },
	  created: function created() {},

	  methods: {}
	};
	// </script>

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(27)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\component\\manage\\type.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(28)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./type.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getters = __webpack_require__(13);

	exports.default = {
	  data: function data() {
	    return {
	      msg: 'Type Module',
	      search: '',
	      name: '',
	      rows: 0,
	      currPage: 1,
	      allPage: 0,
	      pageSize: 6
	    };
	  },

	  computed: {
	    offset: function offset() {
	      //这里主要就是根据currPage生成下offset, 然后交给v-for 和 过滤器处理dom
	      //这里因为父组件传来的webType默认值是null，所以第一次传进来的时候调用webType的相关属性方法或报错。
	      // 同样适用limitBy过滤webType报空指针的原因也在这里。
	      var rows = this.rows;
	      this.allPage = rows % this.pageSize == 0 ? rows / this.pageSize : Math.floor(rows / this.pageSize + 1);
	      if (this.currPage < 1) {
	        this.currPage = 1;
	      } else if (this.currPage > this.allPage && this.allPage > 0) {
	        this.currPage = this.allPage;
	      }
	      return (this.currPage - 1) * this.pageSize;
	    }
	  },
	  created: function created() {
	    this.initInfo();
	  },

	  vuex: {
	    getters: {
	      eventBus: _getters.getEventBus,
	      webTypes: _getters.getWebTypes
	    },
	    actions: {
	      initInfo: function initInfo(_ref) {
	        var dispatch = _ref.dispatch;

	        this.$http.get('/ACGN/mapi/api.getAllType.acgn').then(function (response) {
	          dispatch('UPDATEWEBTYPES', response.data.webTypes);
	        }, function (response) {
	          alert('WebType Module initInfo() Error: ' + response.statusText);
	        });
	      },
	      add: function add(_ref2, name) {
	        var dispatch = _ref2.dispatch;

	        if (name) {
	          this.$http.post('/ACGN/mapi/api.addWebType.acgn', { name: name }).then(function (response) {
	            response.data.infoFlag == 'addFailed' ? alert(response.data.infoFlag) : (dispatch('ADDWEBTYPE', { id: response.data.id, name: name }), this.name = '');
	          }, function (response) {
	            alert('WebType Module add() Error: ' + response.statusText);
	          });
	        } else {
	          alert('not null');
	        }
	      },
	      update: function update(_ref3, type, e) {
	        var dispatch = _ref3.dispatch;

	        this.$http.post('/ACGN/mapi/api.updateWebTypeById.acgn', { id: type.id, name: e.target.value }).then(function (response) {
	          response.data == 'updateFailed' ? alert(response.data) : dispatch('UPDATEWEBTYPE', type.id, e.target.value);
	        }, function (response) {
	          alert("WebType Module update() Error: " + response.statusText);
	        });
	      },
	      del: function del(_ref4, type) {
	        var dispatch = _ref4.dispatch;

	        this.$http.post('/ACGN/mapi/api.delWebTypeById.acgn', { id: type.id }).then(function (response) {
	          response.data == 'delFailed' ? alert(response.data) : (dispatch('DELWEBTYPE', type), this.eventBus.$emit('webTypeDelSuccess'));
	        }, function (response) {
	          alert("WebType Module del() Error: " + response.statusText);
	        });
	      }
	    }
	  },
	  methods: {
	    test: function test() {
	      alert(JSON.stringify(this.webTypes));
	    },
	    clear: function clear() {
	      this.search = '';
	    },
	    begin: function begin() {
	      this.currPage > 1 ? this.currPage = 1 : {};
	    },
	    up: function up() {
	      this.currPage > 1 ? this.currPage-- : {};
	    },
	    dn: function dn() {
	      this.currPage < this.allPage ? this.currPage++ : {};
	    },
	    end: function end() {
	      this.currPage < this.allPage ? this.currPage = this.allPage : {};
	    }
	  },
	  filters: {
	    //中转过滤器，主要是想用于把filterBy过滤的结果转存入当前vm管理的属性中,以供能数据驱动视图

	    myFilter: function myFilter(arr) {
	      this.rows = arr.length;
	      return arr;
	    }
	  }
	};
	// </script>
	// <template>
	//   <div id="type" class="border padding margin">
	//     <div>
	//       <h4 class="float-left">站点类型</h4>
	//       <div class="float-right">
	//         <div class="form-inline">
	//           <div class="form-group">
	//             <div class="field">
	//               <input v-model="search" class="input input-small" type="text" placeholder="webTypeName"/>
	//             </div>
	//           </div>
	//           <div class="form-button">
	//             <button @click="clear" class="button button-small" type="button">clear</button>
	//           </div>
	//         </div>
	//       </div>
	//     </div>
	//     <hr />
	//     <div class="table-responsive">
	//       <table class="table margin-top">
	//         <thead>
	//           <tr>
	//             <td>ID</td>
	//             <td>Name</td>
	//             <td>操作</td>
	//           </tr>
	//           <tr>
	//             <td colspan="2">
	//               <input v-model="name" @keyup.enter="add(name)" class="input input-small" type="text" placeholder="Name" maxlength="30">
	//             </td>
	//             <td>
	//               <button @click="add(name)" class="button button-small" type="button" >Add</button>
	//             </td>
	//           </tr>
	//         </thead>
	//         <tbody>
	//           <tr v-for="type of webTypes | filterBy search in 'name' | myFilter | limitBy pageSize offset">
	//             <td>{{type.id}}</td>
	//             <td>
	//               <input v-model="type.name" @change="update(type, $event)" class="input input-small" type="text" maxlength="30"/>
	//             </td>
	//             <td>
	//               <button @click="del(type)" class="button button-little" type="button">Del</button>
	//             </td>
	//           </tr>
	//         </tbody>
	//         <tfoot>
	//           <tr>
	//             <td colspan="2">
	//               <ul class="pagination pagination-group pagination-small">
	//                 <li><a @click="begin" href="javascript:;">首页</a></li>
	//                 <li><a @click="up" href="javascript:;">上一页</a></li>
	//                 <li><a @click="dn" href="javascript:;">下一页</a></li>
	//                 <li><a @click="end" href="javascript:;">末页</a></li>
	//               </ul>
	//             </td>
	//             <td>
	//               {{currPage}}/{{allPage}}
	//             </td>
	//           </tr>
	//         </tfoot>
	//       </table>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 28:
/***/ function(module, exports) {

	module.exports = "\n<div id=\"type\" class=\"border padding margin\">\n  <div>\n    <h4 class=\"float-left\">站点类型</h4>\n    <div class=\"float-right\">\n      <div class=\"form-inline\">\n        <div class=\"form-group\">\n          <div class=\"field\">\n            <input v-model=\"search\" class=\"input input-small\" type=\"text\" placeholder=\"webTypeName\"/>\n          </div>\n        </div>\n        <div class=\"form-button\">\n          <button @click=\"clear\" class=\"button button-small\" type=\"button\">clear</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <hr />\n  <div class=\"table-responsive\">\n    <table class=\"table margin-top\">\n      <thead>\n        <tr>\n          <td>ID</td>\n          <td>Name</td>\n          <td>操作</td>\n        </tr>\n        <tr>\n          <td colspan=\"2\">\n            <input v-model=\"name\" @keyup.enter=\"add(name)\" class=\"input input-small\" type=\"text\" placeholder=\"Name\" maxlength=\"30\">\n          </td>\n          <td>\n            <button @click=\"add(name)\" class=\"button button-small\" type=\"button\" >Add</button>\n          </td>\n        </tr>\n      </thead>\n      <tbody>\n        <tr v-for=\"type of webTypes | filterBy search in 'name' | myFilter | limitBy pageSize offset\">\n          <td>{{type.id}}</td>\n          <td>\n            <input v-model=\"type.name\" @change=\"update(type, $event)\" class=\"input input-small\" type=\"text\" maxlength=\"30\"/>\n          </td>\n          <td>\n            <button @click=\"del(type)\" class=\"button button-little\" type=\"button\">Del</button>\n          </td>\n        </tr>\n      </tbody>\n      <tfoot>\n        <tr>\n          <td colspan=\"2\">\n            <ul class=\"pagination pagination-group pagination-small\">\n              <li><a @click=\"begin\" href=\"javascript:;\">首页</a></li>\n              <li><a @click=\"up\" href=\"javascript:;\">上一页</a></li>\n              <li><a @click=\"dn\" href=\"javascript:;\">下一页</a></li>\n              <li><a @click=\"end\" href=\"javascript:;\">末页</a></li>\n            </ul>\n          </td>\n          <td>\n            {{currPage}}/{{allPage}}\n          </td>\n        </tr>\n      </tfoot>\n    </table>\n  </div>\n</div>\n";

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(30)
	__vue_script__ = __webpack_require__(32)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\component\\manage\\detail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(33)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./detail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n.selectWidth {\n  width: auto;\n}\n", ""]);

	// exports


/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getters = __webpack_require__(13);

	exports.default = {
	  data: function data() {
	    return {
	      msg: 'siteDetail Module',
	      webDetails: [],
	      name: '',
	      pageSize: 6,
	      searchType: 0,
	      searchName: '',
	      searchFlag: false
	    };
	  },

	  computed: {
	    row: function row() {
	      return this.webDetails.rows;
	    },

	    currPage: {
	      get: function get() {
	        return this.webDetails.currPage;
	      },
	      set: function set(val) {
	        this.webDetails.currPage = val;
	      }
	    },
	    allPage: function allPage() {
	      return this.webDetails.allPage;
	    },
	    webs: function webs() {
	      return this.webDetails.list;
	    }
	  },
	  created: function created() {
	    var _this = this;

	    this.initInfo();
	    this.eventBus.$on('webTypeDelSuccess', function () {
	      return _this.getPagination();
	    });
	  },

	  vuex: {
	    getters: {
	      eventBus: _getters.getEventBus,
	      webTypes: _getters.getWebTypes
	    }
	  },
	  methods: {
	    test: function test() {
	      alert(this.typeId);
	    },
	    getPagination: function getPagination() {
	      //从服务器获取分页
	      var param = {};
	      this.searchFlag == false ? Object.assign(param, { currPage: this.currPage, pageSize: this.pageSize }) : Object.assign(param, { currPage: this.currPage, pageSize: this.pageSize, typeId: this.searchType, name: this.searchName });
	      this.$http.post('/ACGN/mapi/api.getWebsitePagination.acgn', param).then(function (response) {
	        this.webDetails = response.data;
	      }, function (response) {
	        alert('WebDetails Module getPagination() Error: ' + response.statusText);
	      });
	    },
	    initInfo: function initInfo() {
	      this.currPage = 1;
	      this.getPagination();
	    },
	    search: function search() {
	      this.searchFlag = true;
	      this.currPage = 1;
	      this.getPagination();
	    },
	    clear: function clear() {
	      this.searchFlag = false;
	      this.currPage = 1;
	      this.searchType = 0;
	      this.searchName = '';
	      this.getPagination();
	    },
	    begin: function begin() {
	      this.currPage > 1 ? (this.currPage = 1, this.getPagination()) : {};
	    },
	    up: function up() {
	      this.currPage > 1 ? (this.currPage--, this.getPagination()) : {};
	    },
	    dn: function dn() {
	      this.currPage < this.allPage ? (this.currPage++, this.getPagination()) : {};
	    },
	    end: function end() {
	      this.currPage < this.allPage ? (this.currPage = this.allPage, this.getPagination()) : {};
	    },
	    add: function add() {
	      if (this.name) {
	        this.$http.post('/ACGN/mapi/api.addWebsiteOnlyName.acgn', { name: this.name }).then(function (response) {
	          this.name = '';
	          response.data == 'addSuccess' ? this.getPagination() : alert(response.data);
	        }, function (response) {
	          alert('WebDetails Module add() Error: ' + response.statusText);
	        });
	      } else {
	        alert('not null');
	      }
	    },
	    del: function del(web) {
	      this.$http.post('/ACGN/mapi/api.delWebsiteById.acgn', { id: web.id }).then(function (response) {
	        response.data == 'delSuccess' ? this.getPagination() : alert(response.data);
	      }, function (response) {
	        alert('WebDetails Module del() Error: ' + response.statusText);
	      });
	    },
	    update: function update(web) {
	      //时间类型真的讨厌
	      if (web.name) {
	        this.$http.post('/ACGN/mapi/api.updateWebsiteById.acgn', {
	          id: web.id,
	          typeId: web.typeId,
	          name: web.name,
	          url: web.url,
	          imgUrl: web.imgUrl,
	          introduce: web.introduce
	        }).then(function (response) {
	          response.data == 'updateFailed' ? alert(response.data) : {};
	        }, function (response) {
	          alert('WebDetails Module update() Error: ' + response.statusText);
	        });
	      } else {
	        alert('name 不能为空, 更新失败');
	      }
	    }
	  }
	};
	// </script>
	// <style>
	//   .selectWidth {
	//     width: auto;
	//   }
	// </style>
	// <template>
	//   <div id="type" class="border padding margin">
	//     <div>
	//       <h4 class="float-left">站点详细</h4>
	//       <div class="float-right">
	//         <div class="form-inline">
	//           <div class="form-group">
	//             <div class="field">
	//               <select v-model="searchType" class="input input-small">
	//                 <option value="0">请选择</option>
	//                 <option v-for="type of webTypes" :value="type.id">{{type.name}}</option>
	//               </select>
	//             </div>
	//           </div>
	//           <div class="form-group">
	//             <div class="field">
	//               <input v-model="searchName" class="input input-small" type="text" placeholder="websiteName" maxlength="30"/>
	//             </div>
	//           </div>
	//           <div class="form-button">
	//             <button @click="search" class="button button-small" type="button">search</button>
	//           </div>
	//           <div class="form-button">
	//             <button @click="clear" class="button button-small" type="button">clear</button>
	//           </div>
	//         </div>
	//       </div>
	//     </div>
	//     <hr />
	//     <div class="table-responsive">
	//       <table class="table margin-top">
	//         <thead>
	//           <tr>
	//             <td>ID</td>
	//             <td>Name</td>
	//             <td>类型</td>
	//             <td>Url</td>
	//             <td>图片</td>
	//             <td>介绍</td>
	//             <td>操作</td>
	//           </tr>
	//           <tr>
	//             <td colspan="6">
	//               <input v-model="name" @keyup.enter="add" class="input input-small" placeholder="Name" maxlength="30">
	//             </td>
	//             <td>
	//               <button @click="add" class="button button-small" type="button">Add</button>
	//             </td>
	//           </tr>
	//         </thead>
	//         <tbody>
	//           <tr v-for="web of webs" @change="update(web)">
	//             <td>{{web.id}}</td>
	//             <td>
	//               <input v-model="web.name" class="input input-small" type="text" maxlength="30"/>
	//             </td>
	//             <td>
	//               <select v-model="web.typeId" class="input input-small selectWidth">
	//                 <option v-for="type of webTypes" :value="type.id">{{type.name}}</option>
	//               </select>
	//             </td>
	//             <td>
	//               <input v-model="web.url" class="input input-small" type="text" maxlength="300"/>
	//             </td>
	//             <td>
	//               <input v-model="web.imgUrl" class="input input-small" type="text" maxlength="300"/>
	//             </td>
	//             <td>
	//               <input v-model="web.introduce" class="input input-small" type="text" maxlength="150"/>
	//             </td>
	//             <td>
	//               <button @click="del(web)" class="button button-little" type="button">Del</button>
	//             </td>
	//           </tr>
	//         </tbody>
	//         <tfoot>
	//           <tr>
	//             <td colspan="6">
	//               <ul class="pagination pagination-group pagination-small">
	//                 <li><a @click="begin" href="javascript:;">首页</a></li>
	//                 <li><a @click="up" href="javascript:;">上一页</a></li>
	//                 <li><a @click="dn" href="javascript:;">下一页</a></li>
	//                 <li><a @click="end" href="javascript:;">末页</a></li>
	//               </ul>
	//             </td>
	//             <td>
	//               {{currPage}}/{{allPage}}
	//             </td>
	//           </tr>
	//         </tfoot>
	//       </table>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>

/***/ },

/***/ 33:
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n<div id=\"type\" class=\"border padding margin\">\n  <div>\n    <h4 class=\"float-left\">站点详细</h4>\n    <div class=\"float-right\">\n      <div class=\"form-inline\">\n        <div class=\"form-group\">\n          <div class=\"field\">\n            <select v-model=\"searchType\" class=\"input input-small\">\n              <option value=\"0\">请选择</option>\n              <option v-for=\"type of webTypes\" :value=\"type.id\">{{type.name}}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <div class=\"field\">\n            <input v-model=\"searchName\" class=\"input input-small\" type=\"text\" placeholder=\"websiteName\" maxlength=\"30\"/>\n          </div>\n        </div>\n        <div class=\"form-button\">\n          <button @click=\"search\" class=\"button button-small\" type=\"button\">search</button>\n        </div>\n        <div class=\"form-button\">\n          <button @click=\"clear\" class=\"button button-small\" type=\"button\">clear</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <hr />\n  <div class=\"table-responsive\">\n    <table class=\"table margin-top\">\n      <thead>\n        <tr>\n          <td>ID</td>\n          <td>Name</td>\n          <td>类型</td>\n          <td>Url</td>\n          <td>图片</td>\n          <td>介绍</td>\n          <td>操作</td>\n        </tr>\n        <tr>\n          <td colspan=\"6\">\n            <input v-model=\"name\" @keyup.enter=\"add\" class=\"input input-small\" placeholder=\"Name\" maxlength=\"30\">\n          </td>\n          <td>\n            <button @click=\"add\" class=\"button button-small\" type=\"button\">Add</button>\n          </td>\n        </tr>\n      </thead>\n      <tbody>\n        <tr v-for=\"web of webs\" @change=\"update(web)\">\n          <td>{{web.id}}</td>\n          <td>\n            <input v-model=\"web.name\" class=\"input input-small\" type=\"text\" maxlength=\"30\"/>\n          </td>\n          <td>\n            <select v-model=\"web.typeId\" class=\"input input-small selectWidth\">\n              <option v-for=\"type of webTypes\" :value=\"type.id\">{{type.name}}</option>\n            </select>\n          </td>\n          <td>\n            <input v-model=\"web.url\" class=\"input input-small\" type=\"text\" maxlength=\"300\"/>\n          </td>\n          <td>\n            <input v-model=\"web.imgUrl\" class=\"input input-small\" type=\"text\" maxlength=\"300\"/>\n          </td>\n          <td>\n            <input v-model=\"web.introduce\" class=\"input input-small\" type=\"text\" maxlength=\"150\"/>\n          </td>\n          <td>\n            <button @click=\"del(web)\" class=\"button button-little\" type=\"button\">Del</button>\n          </td>\n        </tr>\n      </tbody>\n      <tfoot>\n        <tr>\n          <td colspan=\"6\">\n            <ul class=\"pagination pagination-group pagination-small\">\n              <li><a @click=\"begin\" href=\"javascript:;\">首页</a></li>\n              <li><a @click=\"up\" href=\"javascript:;\">上一页</a></li>\n              <li><a @click=\"dn\" href=\"javascript:;\">下一页</a></li>\n              <li><a @click=\"end\" href=\"javascript:;\">末页</a></li>\n            </ul>\n          </td>\n          <td>\n            {{currPage}}/{{allPage}}\n          </td>\n        </tr>\n      </tfoot>\n    </table>\n  </div>\n</div>\n";

/***/ },

/***/ 34:
/***/ function(module, exports) {

	module.exports = "\n<div id=\"manage\" class=\"line-small border bg-white\">\n  <h3 class=\"margin-top\">{{msg}}</h3>\n  <!-- <hr /> -->\n  <div class=\"xs5\">\n    <web-type></web-type>\n  </div>\n  <div class=\"xs7\">\n    <web-detail></web-detail>\n  </div>\n</div>\n";

/***/ }

});