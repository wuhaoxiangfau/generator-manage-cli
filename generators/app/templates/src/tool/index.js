import Vue from 'vue'

//公共功能类
import pubService from './pubService/index'
//小工具类
import smallTool from './smallTool'
//base64转码
import base64 from './Base64'


Vue.prototype.$tool = {
  code,
  pubService,
  smallTool,
  base64,
};
