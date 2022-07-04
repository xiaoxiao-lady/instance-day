// 赋值测试
let obj1 = {
  name: "浪里行舟",
  arr: [1, [2, 3], 4],
};
let obj2 = obj1;
obj2.name = "阿浪";
obj2.arr[1] = [5, 6, 7];
console.log("obj1", obj1); // obj1 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log("obj2", obj2); // obj2 { name: '阿浪', arr: [ 1, [ 5, 6, 7 ], 4 ] }
// > 对象的属性不管是引用数据类型还是基本数据类型都会被影响，只是栈中的地址复制了一份，堆中的内存是公用的
