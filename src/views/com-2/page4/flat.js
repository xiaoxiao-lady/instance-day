// 【数组扁平化：即多维数组变一维数组】
const arr = [1, [2, [3, 4, [5, 6]]]];
console.log(flattenArr(arr)); // [1, 2, 3, 4]
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
console.log(flattenArrObj(arr, "children")); //
// 【数组拍平】
// 方式一
function flattenArr(arr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result.concat(flattenArr(item));
    } else {
      result.push(item);
    }
  });
  return result;
}
// 【数组对象拍平】
// 方式一
function flattenArrObj(arr, attr) {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item[attr])) {
      result.concat(flattenArrObj(item[attr]));
    } else {
      result.push(item);
    }
  });
  return result;
}
