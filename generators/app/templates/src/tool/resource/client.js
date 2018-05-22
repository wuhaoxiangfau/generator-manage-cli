/**
 * Created by whx on 2018/03/14.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

import Interceptors from './interceptors'
Vue.http.interceptors = Vue.http.interceptors.concat(Interceptors);

import config from '../../../static/config'

//发送数据转义为字符串型 (转义null number ‘’)
function transToString(data){
  for(let item in data){
    if(typeof data[item]==='number'){
      data[item]=data[item].toString();
    }else if(!data[item]){
      data[item]=''
    }
  }
}
//特殊字符转义
function transitionCode(data){
  if(typeof data!=='object'){
    return data
  }
  //转义字符集
  let transCode={
    '+':'##73',
    '&':'##38',
    '%':'##69'
  };
  let str = JSON.stringify(data);
  for (let item in transCode){
    str=str.replace(new RegExp('\\'+item,'g'),transCode[item]);
  }
  return JSON.parse(str)
}

//客户端
class Client {

  constructor() {
    this._sessionid = null;
    this._tokenRegister = {};
    this._header = {};
    this._url = config.url + '/action/serviceInvoke';
    this._http = Vue.http;
    //监听的消息执行map
    this._callbackMap = {};
    //WebSocket对象
    this._ws = null;
    this.setSessionId()
  }

  //设置sessionId
  setSessionId() {
    let data = {_$type: "options", _$actions: "uuid"};
    this.makeRequest(data).then((response) => {
      this._sessionid = response.data.uuid;
    })
  }

  //创建请求
  makeRequest(data) {
    return this._http.post(this._url, data)
  }

  //获取请求头
  getHeader(){
    return this._header
  }

  //发送数据
  sendRequest(path,data){
    transToString(data);
    data = transitionCode(data);
    if(this._sessionid){
      let value = {
        _$type: 'service',
        _$service: path,
        _$data: JSON.stringify({
          'header': this._header,
          'data': data
        }),
        _$sessionid:this._sessionid,
        _$token: new Date().getTime(),
      };
      return this.makeRequest(value)
    }
  }

  //接收webSocket
  callback(data){
    for(let key in this._callbackMap){
      if(key === data.name){
        this._callbackMap[key](data)
      }
    }
  }

  //添加webSocket消息监听
  addWsBack(k,f){
    this._callbackMap[k] = f
  }

  //注册webSocket
  registerWebSocket(){
    return new Promise((resolve, reject) => {
      let ws = new WebSocket(config.webSocketUrl);
      ws.onmessage = (evt) => {
        //解析
        let jsonData = JSON.parse(evt.data);
        // 获取消息类型
        let msgType = jsonData.msgType;
        //回应心跳
        if (msgType === '#heart') {
          ws.send(JSON.stringify({'msgType': '#heart', 'content': ''}));
        }
        //处理信息
        else if (msgType === '#info') {
          //返回WebSocket信息
          resolve(jsonData.content);
        }
        //处理消息
        else {
          //回调函数
          this.callback(jsonData.content);
        }
      };
      this._ws = ws
    })
  }

}

export default new Client()
