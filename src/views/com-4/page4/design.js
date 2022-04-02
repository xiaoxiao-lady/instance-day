/**
 * 初级工厂函数
 */
// 不使用设计模式
class Cat {
  constructor(name) {
    console.log(name);
  }
}
class Dog {
  constructor(name) {
    console.log(name);
  }
}
class Pig {
  constructor(name) {
    console.log(name);
  }
}
class Animal {
  constructor(type, name) {
    this.pet = "";
    switch (type) {
      case "cat":
        this.pet = new Cat(name);
        break;
      case "dog":
        this.pet = new Dog(name);
        break;
      case "pig":
        this.pet = new Pig(name);
        break;
      default:
        this.pig = "还没有小东西去买一只吧";
        break;
    }
  }
}
new Animal("cat", "猫咪");
/**
 * 高级工厂函数
 */
// const animal = (() => {
//   const pets = {
//     cat: (name) => {
//       console.log(name);
//     },
//     dog: (name) => {
//       console.log(name);
//     },
//     pig: (name) => {
//       console.log(name);
//     },
//   };
//   return class {
//     constructor(type, name) {
//       try {
//         return pets[type](name);
//       } catch (error) {
//         alert("还没有小东西去买一只吧");
//       }
//     }
//   };
// })();
// new animal("cat", "猫咪");
// new animal("dog", "狗子");
// new animal("dut", "阿狸");
