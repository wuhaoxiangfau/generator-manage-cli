// 状态
const state = {
  //菜单
  menu: [],
};

// 获取状态器
const getters = {
  //获取用户对象
  menu: state => {
    return state.menu;
  }
};

// 行为
const actions = {
  //获取菜单
  getMenu(context,data){
    let menuData={};
    context.commit('get',menuData);
  },
};

// 状态变更器
const mutations = {
  //获取
  get(state,menuData){
    state.menu = menuData;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
