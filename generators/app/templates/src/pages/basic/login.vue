<template>
  <div id="login">
    <h2 class="title">{{title}}</h2>
    <el-card class="box-card login-bg">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="请输入柜员号" prop="tellerId">
          <el-input v-model="form.tellerId"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="认证方式" prop="tellerPwd">
          <!--密码输入框-->
          <template>
            <el-input v-model="form.tellerPwd" type="password" clearable></el-input>
          </template>
        </el-form-item>
        <el-form-item class="btn-block">
          <el-button type="danger" @click="login(form)" size="large">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
  import { mapActions } from 'vuex'
    export default {
        name: 'login',
        data() {
            return {
              //标题
              title:'欢迎登陆权限管理系统',
              //表单数据
              form:{
                //柜员号
                tellerId:'admin',
                //密码/指纹
                tellerPwd:'111111',
              },
              //校验规则
              rules:{
                tellerId:[
                  { required: true, message: '请输入用户编号', trigger: 'blur' },
                ],
                tellerPwd:[
                  { validator:(rule, value, callback)=>{
                    if(!value){
                      return callback(new Error('密码或指纹不能为空'))
                    }else{
                      //6位数字校验
                      let reg =/^\d{6}$/;
                      if(!reg.test(value)){
                        callback(new Error('请输入6位数字密码'))
                      }else{
                        callback();
                      }
                    }
                  },trigger:'blur'}
                ],
              },
            }
        },
        methods: {
            //打开模态框
            loadingOn(text){
              this.$loading({
                lock: true,
                text: text,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            },
            //关闭模态框
            loadingClose(){
              this.$loading({}).close();
            },
            //登录校验
            async asyncLogin(data){
              this.loadingOn('登录中...');
             //校验登录是否成功
              let tellerPwd = '';
              return {
                tellerId:data.tellerId,
                tellerPwd:tellerPwd,
              };
            },
            //登录
            async login(data){
              this.$refs['form'].validate(async(valid) => {
                if (valid) {
                  //登录
                  let response = await this.asyncLogin(data);
                  let tellerInfo = {
                    tellerId:response.tellerId,
                    tellerName:response.tellerName,
                  };
                  //更新登录柜员信息
                  this.$store.commit('login',tellerInfo);
                  //清空地址栏历史信息
                  this.$router.push({path:'/homePage'});
                  //关闭模态框
                  this.loadingClose();
                } else {
                  this.$message(
                    {
                      message: '请填写正确要素后再提交',
                      type: 'warning'
                    }
                  );
                  return false;
                }
              });
            },
      },
    }
</script>


<style scoped>
  #login{
    background: #499aea;
    width:100%;
    height:1024px;
    position: relative;
  }
  #login>h2.title{
    color: white;
    position: relative;
    left:13%;
    top:26%;
    transform: translate(-13%);
    font-weight: normal;
    font-size:1.5rem;
    text-align: center;
  }
  #login >.login-bg{
    width: 50%;
    height: 32%;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  #login >.login-bg .btn-block{
    text-align: center;
  }
</style>
