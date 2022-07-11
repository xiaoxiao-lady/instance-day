// 【数组扁平化：即多维数组变一维数组】
const arr = [1, [2, [3, 4, [5, 6]]]];
console.log(flattenArr3(arr)); // [1, 2, 3, 4]
const arr2 = [
  {
    value: 1,
    children: [
      {
        value: 2,
        type: 2,
        children: [
          {
            value: 3,
            type: 2,
            children: [],
          },
          {
            value: 4,
            type: 2,
            children: [
              {
                value: 5,
                type: 2,
                children: [],
              },
              {
                value: 6,
                type: 2,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

console.log(flattenArrObj(arr2, "children")); //

// 方式一：foreach+递归
// 【数组拍平】
function flattenArr1(arr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flattenArr1(item)); //concat不会修改原数组
    } else {
      result.push(item);
    }
  });
  return result;
}

// 方式二: ：reduce+concat +递归

function flattenArr2(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flattenArr2(cur) : cur); //注意这里的concat不能直接把cur合并进去，cur可能是数组，这个数组对象的扁平化用reduce的时候和这个的区别
  }, []);
}

function flattenArrObj2(arr, attr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(
      cur,
      Array.isArray(cur[attr]) ? flattenArrObj2(cur[attr], attr) : [] //和普通数组的区别就是cur是一定要合并的
    );
  }, []);
}

// 方式三：扩展运算符实现
function flattenArr3(arr) {
  while (arr.some((ele) => Array.isArray(ele))) {
    // debugger; //理解不了这个方法的可以debugger试试
    arr = [].concat(...arr); //arr每次解构之后concat都会减少一层，在赋值给arr一直，直到只剩下一层
  }
  return arr;
}

// 方式四：ES6的flat
function flattenArr4(arr) {
  return arr.flat(Infinity);
}

// 数组对象的扁平化
function flattenArrObj(arr, attr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(
      cur,
      Array.isArray(cur[attr]) ? flattenArrObj2(cur[attr], attr) : [] //和普通数组的区别就是cur是一定要合并的
    );
  }, []);
}
