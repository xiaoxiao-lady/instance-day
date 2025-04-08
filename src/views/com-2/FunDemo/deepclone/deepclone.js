/**
 *通过Object.prototype.toString.call(val) 判断的结果值枚举
 */

import deepClone from "./deepClone.vue";

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
// 构造方法初始化cloneTarget
function getInit(target) {
  // 利用其构造函数初始化cloneTarget ，eg:cloneTarget  =  new Array() 相当于初始化了一个[]
  const Ctor = target.constructor; // 获取目标值的构造方法[1].constructor == Array;
  return new Ctor();
}
// 其他的不可遍历的数据类型是指，他通过typeof判断是对象，但是他通过Object.prototype是一些基本的类型
// 其他的不可遍历的数据类型是指，包装对象，他通过typeof判断是对象，但是他通过Object.prototype是一些基本的类型
// 因为 typeof 无法区分基本类型和包装对象。
// 比如：‌（如 new Number(42), new String("hello")）是对象类型。虽然它们包裹了基本数据，但属于引用类型，需要深拷贝。
// const num = 42; // 基本类型，直接复制即可
// const numObj = new Number(42); // 对象类型，需要深拷贝
function getType(target) {
  return Object.prototype.toString.call(target);
}
// 拷贝函数
function cloneFunction(target) {
  const bodyReg = /(?<={)(.|\n)+(?=})/;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
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
// 拷贝正则-也是通过new构造函数
function cloneReg(target) {
  debugger
  // eg:exp: /\d{2,5}/例子输出的就是下面的正则对象
  //target = {
  //   lastIndex: 0;
  //   dotAll: false;
  //   flags: "";
  //   global: false;
  //   hasIndices: false;
  //   ignoreCase: false;
  //   multiline: false;
  //   source: "\\d{2,5}";
  //   sticky: false;
  //   unicode: false;
  // }
  const Ctor = target.constructor;
  let result = new Ctor(target.source, target.flags); //// 复制模式和标志
  result.lastIndex = target.lastIndex; //复制状态（如 lastIndex）
  return result;
}
// 拷贝不可循环递归的对象
function cloneOtherDeep(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case numberTag:
    case stringTag:
    case boolTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    //  处理正则
    case funTag:
      return cloneFunction(target);
    // 处理函数;
    default:
      return null;
  }
}
// 工具函数-循环
function myForEach(array, cb) {
  let index = -1;
  const len = array.length;
  while (++index < len) {
    cb(array[index], index); //回调传参
  }
  return array;
}
export function cloneDeep(target, weakMap = new WeakMap()) {
  if (!isObject(target)) {
    return target;
  }
  let cloneTarget;
  const type = getType(target);
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
  console.log("keys", Object.getPrototypeOf(target));
  for (const key in target) {
    console.log("key", key, target[key]);
  }
  const keys = type == arrayTag ? undefined : Object.keys(target);
  //从性能优化的角度考虑，测试证明while的性能比for in和for的性能要好，foreach的原理是while
  myForEach(keys || target, (value, key) => {
    if (keys) {
      key = value; //keys遍历的话value才是我们要的key
      value = target[key];
    }
    cloneTarget[key] = cloneDeep(value, weakMap);
  });
  return cloneTarget;
}

// demo

let obj1 = {
  name: "浪里行舟",
  arr: [1, [2, 3], 4],
  exp: /\d{2,5}/,
};
let obj2 = cloneDeep(obj1);
obj2.name = "阿浪";
obj2.arr[1] = [5, 6, 7];
console.log("obj1", obj1); // obj1 { name: '浪里行舟', arr: [ 1, [ 2, 3 ], 4 ] }
console.log("obj2", obj2); // obj2 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }

// // >结论：完全拷贝了一份新的内存空间，都不公用，互补影响
// // 深拷贝实现方式
// // 方式一：JSON.stringify+JSON.parse
// let arr = [
//   1,
//   3,
//   {
//     username: {
//       name: "lianha",
//     },
//   },
// ];
// let arr4 = JSON.parse(JSON.stringify(arr));
// arr4[2].username.name = "duncan";
// arr4[0] = 0;

// console.log(arr); //[1, 3, { username: {name:'lianha'} }]
// console.log(arr4); //[0, 3, { username: {name:'duncan'} }]

// // 方式二：函数库lodash的_.cloneDeep方法
// import { cloneDeep as _cloneDeep } from "lodash";
// let arr20 = [
//   1,
//   3,
//   {
//     username: {
//       name: "lianha",
//     },
//   },
// ];
// let arr21 = _cloneDeep(arr20);
// arr21[2].username.name = "duncan";
// console.log(arr); //[1, 3, { username: {name:'lianha'} }]
// console.log(arr21); //[1, 3, { username: {name:'duncan'} }]

// // 方式三：jQuery.extend()
// // 方式四：手写深度递归拷贝

const regex1 = /abc/gi;
const regexCopy = deepClone(regex1)
console.log(regexCopy)
regexCopy.lastIndex  = 5
console.log(regex1)
