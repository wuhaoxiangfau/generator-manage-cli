<template>
  <el-container id="home">
    <el-header class="my-header">
      <el-row>
        <el-col :span="16">
          <div >
            <i class="fa fa-laptop logo">{{title}}</i>
          </div>
        </el-col>
        <el-col :span="8">
          <my-drop-down :tellerInfo="user"></my-drop-down>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <my-aside-menu ></my-aside-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
  export default {
        name: 'home',
        data() {
            return {
                title:'权限管理系统'
            }
        },
        props:{
          user:Object
        }

    }
</script>


<style >
 #home> .my-header{
    text-align: center;
    background: dodgerblue;
    color:#ffffff;
    font-size: 1.5rem;
    line-height: 3rem;
    border-radius: .3rem .3rem 0 0;
  }

 #home >.my-header>.el-row>.el-col>div>.logo{
    position: relative;
    left:40%;
    transform: translate(-50%);
  }
</style>
