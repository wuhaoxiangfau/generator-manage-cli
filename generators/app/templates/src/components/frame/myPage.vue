<template>
  <div class="myPage">
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page.sync="pageInfo.page"
        :page-sizes="$tool.code.sysCode.columnOptions"
        :page-size="pageInfo.size"
        layout="sizes, prev, pager, next"
        :total="parseInt(pageInfo.total)">
      </el-pagination>
  </div>
</template>


<script>
    export default {
        name: 'myPage',
        data() {
            return {

            }
        },
        methods:{
          //改变页码
          pageChange(current){
            this.$emit('currentPage',current);
          },
          //改变显示条数
          sizeChange(size){
            this.$emit('sizePage',size);
          }
        },
        props:{
          pageInfo:Object
        },

    }
</script>


<style scoped>
  .myPage{
    text-align: right;
  }
</style>
