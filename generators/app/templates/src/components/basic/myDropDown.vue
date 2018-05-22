<template>
  <div id="myDropDown">
    <el-popover
      ref="popover"
      placement="bottom"
      width="200"
      trigger="click">
        <div class="tellerInfo">
          <span>姓名:</span>{{tellerInfo.tellerName}}
        </div>
        <div class="tellerInfo">
          <span>用户编号:</span>{{tellerInfo.tellerId}}
        </div>
        <div class="tellerInfo">
          <el-button size="mini" type="danger" @click="logout">
              <i class="fa fa-reply">&nbsp;注销</i>
          </el-button>
        </div>
    </el-popover>

    <el-button v-popover:popover>
      <i class="fa fa-user-o">&nbsp;柜员信息</i>
    </el-button>
  </div>
</template>


<script>
    export default {
        name: 'myDropDown',
        methods:{
          //登出操作
          logout(){
            this.$alert('确定注销吗', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                //vuex  Mutations映射
                this.$store.commit('logout')
              }
            });
          }
        },
        props:{
          tellerInfo:Object
        }
    }
</script>


<style scoped>
  #myDropDown{
    text-align: right;
  }
  #myDropDown > .el-button{
    background: transparent;
    color: #ffffff;
    border: none;
    position: relative;
    top:-.45rem;
  }
  div.tellerInfo{
    border-bottom:1px solid #00000024;
    height:1rem;
    font-size: .8rem;
    line-height: 1rem;
    margin:.5rem;
  }
  div.tellerInfo>span{
    margin-right: 2rem;
  }
  div.tellerInfo:nth-child(4){
    text-align: right;
    border: none;
  }
</style>
