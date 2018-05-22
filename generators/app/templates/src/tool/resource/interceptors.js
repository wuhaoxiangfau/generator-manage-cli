/**
 * Created by whx on 2018/03/14.
 */
import { Message } from 'element-ui';


//编码为表单格式数据
function toEncode(data) {
  let res = "";
  if (typeof data === "object") {
    for (let name in data) {
      if (data.hasOwnProperty(name)) {
        let value = data[name];
        let item = name + "=" + value;
        if (res.length > 0) {
          res += "&";
        }
        res += item;
      }
    }
  } else {
    res = data;
  }
  return res
}

export default [
  //编码过滤器
  (request, next) => {
    request.body = toEncode(request.body);
    next()
  },
  //判系统型错误
  (request, next) => {
    next(function (response) {
      if (response.body.header) {
        let retCode = response.body.header.retCode;
        if (retCode === '000000') {
          response.body = response.body.data
        }else{
          Message.error(response.body.header.retMsg);
          response.ok = false;
        }
      }
    })
  }
]
