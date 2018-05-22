<template>
  <div class="mySearch">
    <el-form
      ref="form"
      :model="queryData.form"
      label-width="80px"
      class="myForm">
      <el-form-item
        v-for="(value,key) in queryData.form"
        v-if="value.placeholder"
        :key="key"
        :label="value.placeholder">
        <!--输入框-->
        <template v-if="!value.type">
          <el-input
            v-model="queryData.form[key].value"
            >
          </el-input>
        </template>
        <!--下拉选-->
        <template v-if="value.type==='select'">
          <el-select
            v-model="queryData.form[key].value"
            clearable
            >
            <el-option
              label="请选择"
              :value="null">
            </el-option>
            <el-option
              v-for="option in $tool.code.sysCode[key]"
              :key="option.value"
              :label="option.text"
              :value="option.value"></el-option>
          </el-select>
        </template>
        <!--日期选择器-->
        <template v-if="value.type==='date'">
          <el-date-picker
            v-model="queryData.form[key].value"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy/MM/dd">
          </el-date-picker>
        </template>
        <!--时间选择器-->
        <template v-if="value.type==='time'">
          <el-time-picker
            v-model="queryData.form[key].value"
            value-format="HH:mm:ss"
            placeholder="选择时间"
          >
          </el-time-picker>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button  icon="el-icon-search" @click="searching">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
    export default {
        name: 'mySearch',
        data() {
            return {
              //查询数据
              queryData:{
                form:{}
              }
            }
        },
        props:{
          tableConfig:Object
        },
        methods:{
          //初始化查询数据
          initSearchData(){
            for(let item in this.tableConfig.form){
              if(this.tableConfig.form.hasOwnProperty(item)){
                this.$set(this.queryData.form,item,this.tableConfig.form[item]);
              }
            }
          },
          //查询
          searching(){
            this.$emit('searching',this.queryData.form);
          }
        },
        created(){
          this.initSearchData();
        }
    }
</script>


<style scoped>
  .mySearch >.myForm {
    display: flex;
  }

</style>
