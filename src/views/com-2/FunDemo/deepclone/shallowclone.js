//学习资料：

function shallowClone(target) {
  var cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key]; //浅拷贝就是没有递归拷贝里面的子对象，所以子对象还是公用的同一块内存
  }
  return cloneTarget;
}

// 浅拷贝
let obj1 = {
  name: "浪里行舟",
  arr: [1, [2, 3], 4],
};
let obj2 = shallowClone(obj1);
obj2.name = "阿浪";
obj2.arr[1] = [6, 7, 8];
console.log("obj1", obj1.name, obj1.arr); //obj1 浪里行舟 (3) [1, [6,7,8], 4]
console.log("obj2", obj2.name, obj2.arr); //obj2 阿浪 (3) [1, [6,7,8], 4]

// >结论，浅拷贝之后新旧对象里面的基本类型属性不会公用内存，引用类型属性还是公用同一个堆内存

// 浅拷贝实现方式
// 方式一： Object.assign

let obj11 = {
  name: "浪里行舟",
  arr: [1, [2, 3], 4],
};
let obj12 = Object.assign({}, obj11);
obj12.name = "阿浪";
obj12.arr[1] = [6, 7, 8];
console.log(obj11); // obj1 浪里行舟 (3) [1, [6,7,8], 4]
// >结论：Object.assign是浅拷贝，对象的基本类型属性不会被影响，引用类型共用一个内存会被修改

// 方式二：lodash里面的clone
import { clone } from "lodash";
let obj21 = {
  name: "浪里行舟",
  arr: [1, [2, 3], 4],
};
let obj22 = clone(obj21);
obj22.name = "阿浪";
obj22.arr[1] = [6, 7, 8];
console.log(obj21.arr == obj22.arr); //true
console.log(obj21.name == obj22.name); // false
// >结论：clone是浅拷贝，对象的基本类型属性不公用内存，引用类型共用一个内存会被修改

// 方式三：...扩展运算符

let obj31 = {
  name: "浪里行舟",
  arr: [1, [2, 3], 4],
};
let obj32 = { ...obj31 };
obj32.name = "阿浪";
obj32.arr[1] = [6, 7, 8];
console.log(obj31); //浪里行舟 [1, [6,7,8], 4]

// 方式四：数组的concat;
let arr = [
  1,
  3,
  {
    username: "kobe",
  },
];
let arr2 = arr.concat();
arr2[0] = 0;
arr2[2].username = "wade";
console.log(arr); //[ 1, 3, { username: 'wade' } ]
console.log(arr2); //[ 0, 3, { username: 'wade' } ]
// >结论：数组的concat是浅拷贝

// 方式五：数组的slice;
let arr20 = [
  1,
  3,
  {
    username: "kobe",
  },
];
let arr21 = arr20.slice();
arr21[0] = 0;
arr21[2].username = "wade";
console.log(arr20); //[ 1, 3, { username: 'wade' } ]
console.log(arr21); //[ 0, 3, { username: 'wade' } ]
