
import client from './client'

class Api {

  constructor(name) {
    this.name = name
  }

  //管理端服务
  send(path,data){
    return client.sendRequest('manage/'+this.name+'/'+path,data);
  }

  //通用服务
  sendStm(path,data){
    return client.sendRequest('stm/'+this.name+'/'+path,data)
  }

  registerWebSocket(){
    return client.registerWebSocket();
  }
}

export default Api
