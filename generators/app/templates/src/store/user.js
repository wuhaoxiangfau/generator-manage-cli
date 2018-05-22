// 状态
const state = {
  //用户
  user: {
    //用户编号
    tellerId: null,
    //用户姓名
    tellerName: null,
  },
};

// 获取状态器
const getters = {
  //获取用户对象
  user: state => {
    return state.user;
  }
};

// 行为
const actions = {
  //密码登入
  pwdLogin(context,data){
    let tellerInfo = {
      tellerId:data.tellerId,
      tellerName:''
    };
    context.commit('login', tellerInfo);
  },
};

// 状态变更器
const mutations = {
  //登入
  login(state, userInfo){
    state.user.tellerId = userInfo.tellerId;
    state.user.tellerName = userInfo.tellerName;
  },
  // 登出
  logout(state){
    state.user = {
      //用户编号
      tellerId: null,
      //用户姓名
      tellerName: null,
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
