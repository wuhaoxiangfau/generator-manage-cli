<template>
  <div class="myTreeList">
    <el-tree
      ref="tree"
      :data="treeData"
      show-checkbox
      node-key="menuId"
      :default-expanded-keys="checkList"
      :default-checked-keys="checkList"
      :props="defaultProps">
    </el-tree>
    <div class="buttonGroup">
      <el-button @click="checkAll" type="primary" round size="mini">全选</el-button>
      <el-button @click="resetNode" type="warning" round size="mini">清空</el-button>
    </div>
  </div>
</template>


<script>
    export default {
        name: 'myTreeList',
        data() {
            return {
              defaultProps:{
                label:'menuName',
                children:'children'
              },
            }
        },
        props:{
          treeData:Array,
          checkList:Array
        },
        methods:{
          //清空
          resetNode(){
            this.$refs.tree.setCheckedKeys([]);
          },
          //全选
          checkAll(){
            let checkedList=[];
            for(let i=0;i<this.treeData.length;i++){
              let node=this.treeData[i];
              checkedList.push(node.menuId);
            }
            this.$refs.tree.setCheckedKeys(checkedList);
          },
          //获取已选择的node
          getCheckedNode(){
            return this.$refs.tree.getCheckedNodes();
          },
        },
    }
</script>


<style scoped>
  .myTreeList{

  }
  .buttonGroup{
    text-align: right;
  }
</style>
