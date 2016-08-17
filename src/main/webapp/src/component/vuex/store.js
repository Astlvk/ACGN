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

export default new Vuex.Store({state, mutations, actions, getters});
