<template>
  <div class="myForm">
    {{Form}}
    <el-form :model="form" ref="form" label-width="120px"  :rules="rules">
      <!--修改模板-->
      <template v-if="flag==='edit'" v-for="(item,index) in showData.form" >
        <el-form-item :label="item.label" :prop="item.name">
            <!--输入框-->
            <template v-if="!item.type">
              <el-input class="myInput" v-model="form[item.name]" :disabled="showData.disabled.includes(item.name)"></el-input>
            </template>
            <!--下拉选-->
            <template v-if="item.type==='select'">
              <el-select v-model="form[item.name]"
                         :placeholder="item.placeholder"
                         :disabled="showData.disabled.includes(item.name)">

                  <el-option v-for="option in sysCode[item.name]"
                              :label="option.text"
                              :value="option.value"
                              :key="option.value"
                  >
                  </el-option>
              </el-select>
            </template>
            <!--日期选择器-->
            <template v-if="item.type==='date'">
              <el-date-picker
                :disabled="showData.disabled.includes(item.name)"
                v-model="form[item.name]"
                @change=""
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy/MM/dd">
              </el-date-picker>
            </template>
            <!--特殊下拉菜单-->
            <template v-if="item.type==='special_select'">
              <slot name="special_select"></slot>
            </template>
            <template v-if="item.type==='special_select1'">
              <slot name="special_select1"></slot>
            </template>
        </el-form-item>
      </template>
      <!--新增模板-->
      <template v-if="flag==='add'" v-for="(item,index) in showData.form">
        <el-form-item :label="item.label" :prop="item.name">
          <!--输入框-->
          <template v-if="!item.type">
            <el-input class="myInput"
                      size="small"
                      v-model="form[item.name]"
                      :disabled="showData.disabled.includes(item.name)">

            </el-input>
          </template>
          <!--下拉选-->
          <template v-if="item.type==='select'">
            <el-select v-model="form[item.name]"
                       :placeholder="item.placeholder"
                       :disabled="showData.disabled.includes(item.name)">

              <el-option v-for="option in sysCode[item.name]"
                         :label="option.text"
                         :value="option.value"
                         :key="option.value"
              >
              </el-option>
            </el-select>
          </template>
          <!--日期选择器-->
          <template v-if="item.type==='date'">
            <el-date-picker
              v-model="form[item.name]"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy/MM/dd">
            </el-date-picker>
          </template>
          <!--特殊下拉菜单-->
          <template v-if="item.type==='special_select'">
            <slot name="special_select"></slot>
          </template>
          <template v-if="item.type==='special_select1'">
            <slot name="special_select1"></slot>
          </template>
          <!--输入框查询-->
          <template v-if="item.type==='search'">
            <el-input  v-model="form[item.name]" class="myInput">
              <el-button @click="search(form[item.name],item.otherData)" slot="append" icon="el-icon-search">{{item.otherData.chn}}</el-button>
            </el-input>
          </template>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="sendToFather">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  import sysCode from './../../tool/code/sysCode'
  import mySpecialSelect from './mySpecialSelect.vue'
  export default {
        name: 'myForm',
        data() {
            return {
              form:{},
              //字典代码
              sysCode:sysCode,
              rules:{

              }
            }
        },
        props:{
          showData:Object,
          flag:String,
        },
        methods:{
          //查询方法
          search(value,data){
            if(data.rule(value)){//校验通过
              //赋值
              this.form[data.name] = data.methods('a');
            }
          },
          //数据给父组件
          sendToFather(){
            this.$refs['form'].validate((valid) => {
              if (valid) {
                this.$emit('child',this.form);
              }
            });
          },
          //初始化form数据
          initFormData(){
            if(this.showData.form.length>0){
              for(let i=0;i<this.showData.form.length;i++){
                if(!this.showData.form[i].type||this.showData.form[i].type==='select'||this.showData.form[i].type==='date'||this.showData.form[i].type==='search'){
                  let name = this.showData.form[i].name;
                  let rules = this.showData.form[i].rules;
                  this.$set(this.form,name,null);
                  this.$set(this.rules,name,rules);
                }
              }
            }
          },
        },
        computed:{
          //改变值
          Form(){
            let form = {};
            if(this.flag=== 'edit' ){
              for(let item in this.showData.rowData){
                if(this.showData.rowData.hasOwnProperty(item)&& typeof this.showData.rowData[item]==='string'){
                  form[item]=this.showData.rowData[item];
                }
              }
              this.form = form;
            }else{
              for(let i=0;i<this.showData.form.length;i++){
                let item  = this.showData.form[i];
                if(item.value){
                  this.form[item.name] = item.value;
                }
              }
            }
          }
        },
        beforeMount(){
          //初始化表单数据
          this.initFormData();
        },
        components:{
          mySpecialSelect
        }
    }
</script>


<style>
  .myInput{
    width:60%;
  }
</style>
