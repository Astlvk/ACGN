/**
 * 存储公用应用状态数据的store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const state = {
  eventBus: new Vue(),
  webTypes: [],
};

// const mutations = {
//   UPDATEWEBTYPES (state, webTypes) {
//     state.webTypes = webTypes;
//   },
//   ADDWEBTYPE (state, webType) {
//     state.webTypes.push(webType);
//   },
//   UPDATEWEBTYPE (state, id, value) {
//     for (let i = 0; i < state.webTypes.length; i++) {
//       if (state.webTypes[i].id === id) {
//         state.webTypes.$set(i, {id, name: value});
//       }
//     }
//   },
//   DELWEBTYPE (state, type) {
//     state.webTypes.$remove(type);
//   }
// };

export default new Vuex.Store({state, mutations,actions, getters});
