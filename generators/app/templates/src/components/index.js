import Vue from 'vue'

function initComponent(componentMap) {
  for(let key in componentMap){
    if(componentMap.hasOwnProperty(key)){
      let url = componentMap[key];
      Vue.component(key, ()=>import(`@/components/${url}`))
    }
  }
}
let componentMap= {
  // 侧边主菜单
  myAsideMenu:'basic/myAsideMenu.vue',
  // 下弹出框
  myDropDown:'basic/myDropDown.vue',
  // 提交表单
  myForm:'frame/myForm.vue',
  // 页码展示
  myPage:'frame/myPage.vue',
  //搜索区
  mySearch:'frame/mySearch.vue',
  //树形展示列表
  myTreeList:'frame/myTreeList.vue',
};

initComponent(componentMap);
