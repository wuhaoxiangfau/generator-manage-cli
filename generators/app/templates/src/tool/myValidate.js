import Vue from 'vue'
let validate = {
  //必输校验
  require:(text)=>{
    return {
      required: true, message: text?text:'必输', trigger: 'blur'
    }
  },
  //数字校验
  mustNum:{
    validator:(rule, value, callback)=>{
      let rex = /^-?[1-9]\d*$/;
      if(!rex.test(value)){
        callback(new Error('请输入数字值'));
      }else{
        callback()
      }
    },trigger:'blur'
  },
  //长度范围 num1前范围，num2后范围
  numRange:(num1,num2)=>{
    return {
      validator:(rule, value, callback)=>{
        if(value.length<num1||value.length>num2){
          callback(new Error(`输入范围在${num1}~${num2}之间`));
        }else{
          callback()
        }
      },trigger:'blur'
    }
  },
  //
};

Vue.prototype.$myValidate = validate;

