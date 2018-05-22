/*
 主store
 */
import Vue from 'vue'
import Vuex from 'vuex'
//用户信息
import user from './user'
//菜单信息
import menu from './menu'



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,menu
  }
});
