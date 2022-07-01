/**
 *通过Object.prototype.toString.call(val) 判断的结果值枚举
 */

// 可以循环遍历的数据类型;
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

// 不用循环遍历的数据类型
const numberTag = "[object Number]";
const boolTag = "[object Boolean]";
const stringTag = "[object String]";
const funTag = "[object Function]";
const dateTag = "[object Date]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";

// 需要循环遍历的
const deepTag = [mapTag, setTag, objectTag, arrayTag, argsTag];
export const isObject = (target) => {
  return (
    typeof target !== "null" &&
    (typeof target == "object" || typeof target == "function")
  );
};
function getInit(target) {
  // 利用其构造函数初始化cloneTarget ，eg:cloneTarget  =  new Array() 相当于初始化了一个[]
  const Ctor = target.constructor; // 获取目标值的构造方法[1].constructor == Array;
  return new Ctor();
}
// 其他的不可遍历的数据类型是指，他通过typeof判断是对象，但是他通过Object.prototype是一些基本的类型
function getType(target) {
  return Object.prototype.toString.call(target);
}
function cloneFunction(target) {
  const bodyReg = /(?<={)(.|\n)+(?=})/;
  const paramReg = /(?<=().+(?=)\s+{)/;
  const funString = target.toString();
  if (target.prototype) {
    const body = bodyReg.exec(funString)[0];
    const param = paramReg.exec(funString)[0];
    if (body) {
      if (param) {
        const arrParams = param.split(",");
        return new Function(...arrParams, body);
      } else {
        return new Function(body);
      }
    } else {
      return null;
    }
  } else {
    return eval(funString);
  }
}
function cloneOtherDeep(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case numberTag:
    case stringTag:
    case boolTag:
    case errorTag:
    case dateTag:
      return new Ctor();
    case regexpTag:
    //  处理正则
    case funTag:
      return cloneFunction(target);
    // 处理函数;
    default:
      return null;
  }
}
function myForEach(array, cb) {
  let index = -1;
  const len = array.length;
  while (++index < len) {
    cb(array[index], index); //回调传参
  }
  return array;
}
export function cloneDeep(target, weakMap = new WeakMap()) {
  const Ctor = target.constructor; //
  if (!isObject) {
    return target;
  }
  let cloneTarget;
  const type = getType();
  if (deepTag.includes(type)) {
    // 循环遍历的函数
    cloneTarget = getInit(target);
  } else {
    // 处理不可遍历的其他基础类型;
    return cloneOtherDeep(target, type);
  }
  /**
   * 【处理循环引用，所以用weakmap存储】
   */
  if (weakMap.get(target)) {
    return weakMap.get(target);
  }
  weakMap.set(target, cloneTarget); //这里需要注意的是weakMap.set是浅设置的，后面cloneTarget改变的话这里存储的值也会对应改变，所以在哪里set都可以的

  /**
   * 【set结构】
   */
  // set数据类型拷贝,循环设置add方法
  if (type == setTag) {
    target.forEach((value, key) => {
      cloneTarget.add(cloneDeep(value)); //递归拷贝.set有forEach方法
    });
    return cloneTarget;
  }
  /**
   * 【map结构】
   */
  // map数据类型拷贝,循环设置set(key,value)方法
  if (type == mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, cloneDeep(value, weakMap));
    });
    return cloneTarget;
  }
  /**
   * 【数组和对象】
   */
  // 对象的话需要遍历的是keys，数组直接遍历
  const keys = type == arrayTag ? undefined : Object.keys(target);
  //从性能优化的角度考虑，测试证明while的性能比for in和for的性能要好，foreach的原理是while
  myForEach(keys || target, (value, key) => {
    if (keys) {
      key = value; //keys遍历的话value才是我们要的key
    }
    cloneTarget[key] = cloneDeep(value, weakMap);
  });
  return cloneTarget;
}
