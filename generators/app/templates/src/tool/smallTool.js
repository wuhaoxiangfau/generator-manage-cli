/**
 * 小工具
 *
 */

class SmallTool {

  //更新对象value值
  static updateValue(oldObj, newObj) {
    for (let key1 in oldObj) {
      for (let key2 in newObj) {
        if (key1 === key2) {
          oldObj[key1] = newObj[key2];
          break;
        }
        if(!oldObj.hasOwnProperty(key2)){
          oldObj[key2]=newObj[key2];
        }
      }
    }
    return oldObj;
  }

  //翻译至中文方法
  static translateToChn(key, Map) {
    for (let item in Map) {
      if (item === key) {
        return Map[item]
      }
    }
  }
}


export default SmallTool
