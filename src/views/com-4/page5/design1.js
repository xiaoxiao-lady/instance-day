// 老接口
const oldObj = [
  {
    name: "hangzhou",
    id: 11,
  },
  {
    name: "jinhua",
    id: 12,
  },
];

console.log(oldObj);

// 新接口希望是下面形式
const res = {
  hangzhou: 11,
  jinhua: 12,
};
const adaptor = (oldObj = []) => {
  const obj = oldObj.reduce((pre, item) => {
    pre[item.name] = item.id;
    return pre;
  }, {});
  return obj;
};
console.log(adaptor(oldObj));
// // 这时候就可采用适配者模式
// const adaptor = (function(oldCity) {
//   const obj = {}
//   for (let city of oldCity) {
//     obj[city.name] = city.id
//   }
//   return obj
// }())
