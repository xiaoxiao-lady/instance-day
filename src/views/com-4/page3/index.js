function Singleton(name) {
  this.name = name;
  // this.instance = null;
}
// 写法一
// Singleton.getInstance = function(name) {
//   if (!this.instance) {
//     this.instance = new Singleton(name); //想要获取实例对象只能通过调用getInstance，有则直接返回，没有创建，这个就是单例
//   }
//   return this.instance;
// };
Singleton.getInstance = (function(name) {
  let instance;
  return function() {
    if (!instance) {
      instance = new Singleton(name); //想要获取实例对象只能通过调用getInstance，有则直接返回，没有创建，这个就是单例
    }
    return instance;
  };
})();
const s1 = Singleton.getInstance("a");
const s2 = Singleton.getInstance("阿");
console.log(s1 === s2); //实例出的类完全相等
