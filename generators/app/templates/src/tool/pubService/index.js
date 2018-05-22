import {MessageBox} from 'element-ui'

let pubService = {
  //创建权限树
  makeTree(father_node, node_list, props){
    let tree = [];
    for (let i = 0; i < node_list.length; i++) {
      let power = node_list[i];
      if (father_node[props[0]] === power[props[1]]) {
        power.children = pubService.makeTree(power, node_list, props);
        tree.push(power)
      }
    }
    return tree
  },
  //创建菜单结构
  makeMenuStructure(power_list, props){
    let tree = [];
    for (let i = 0; i < power_list.length; i++) {
      let power = power_list[i];
      if (!power[props[1]]) {
        power.children = pubService.makeTree(power, power_list, props);
        tree.push(power);
      }
    }
    return tree
  },
  //时间函数初始化
  timeInit(){
    let currentTime = new Date();
    let month=currentTime.getMonth()+1;
    let day  = currentTime.getDate();
    let year = currentTime.getFullYear();
    let hour = currentTime.getHours();
    let minute =currentTime.getMinutes();
    return year+'/'+month+'/'+day+'/'+hour+'/'+minute;
  },
  //删除警告
  deleteWarn(callback){
    MessageBox.confirm('将永久删除,是否继续?','提示',{
      confirmButtonText: '取消',
      cancelButtonText: '确定',
      type:'warning'
    }).then(()=>{
      console.log('delete cancel')
    }).catch(()=>{
      callback();
    })
  }
};

export default pubService;
