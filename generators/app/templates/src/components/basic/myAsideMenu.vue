<template>
  <div id="myAsideMenu">
    <el-menu
      default-active="1"
      router
    >
      <el-submenu v-for="(item,index) in menuData" :index="item.router" :key="index">
        <template slot="title">
          <i class="fa" :class="item.icon"></i>
          <span class="fMenuTitle">&nbsp;{{item.menuName}}</span>
        </template>
        <el-menu-item-group v-for="(sMenu,index) in item.children" :key="index">
          <template slot="title">
            <span class="sMenuTitle">{{sMenu.menuName}}</span>
          </template>
          <el-menu-item v-for="(tMenu,index) in sMenu.children" :index="tMenu.router" :key="index">
            <template>
              <i class="fa" :class="tMenu.icon"></i>
              <span>{{tMenu.menuName}}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'myAsideMenu',
        data() {
            return {
              menuData:null,
            }
        },
        methods:{
          //获取菜单结构
          getMenu(){
            this.menuData = this.$tool.pubService.makeMenuStructure(this.menu,['menuId','menuUpper']);
          }
        },
        beforeMount(){
           this.getMenu();
        },
        computed: {
          ...mapGetters([
            'menu'
          ])
        },

    }
</script>


<style >
  #myAsideMenu > ul{
    height:91vh;
  }
  #myAsideMenu >ul>li{

  }
  span.fMenuTitle{
    font-size:1rem;
    font-weight: 150;
  }
  span.sMenuTitle{
    font-size:.75rem;
    font-weight: 120;
  }
</style>
