<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    const obj = {
      name: "王金玉",
      school: {
        address: "大同",
        name: "山西大同大学",
        a: {
          aa: "a",
        },
      },
    }; //普通的对象
    const obj1 = {
      name: "王金玉",
      school: {
        address: "大同",
        name: "山西大同大学",
      },
    };
    const fun = function(a) {
      return a;
    };
    obj1.a = obj1; //循环引用的对象调用deepClone会报错
    // const res = this.deepClone(obj1);
    const res = this.cloneDeep3(fun);
    console.log("----", res);

    // const hash = new Map();
    // hash.set(obj, obj); //后面的obj变化了，hash的结构也跟着改变了
    // obj.a = {
    //   age: 20,
    // };
    // console.log(hash);
  },
  methods: {
    isObject(source) {
      return (
        (typeof source == "object" || typeof source == "function") &&
        source != null
      );
    },
    deepClone(source) {
      if (!this.isObject(source)) return source;
      const cloneObj = Array.isArray(source) ? [] : {}; //考虑拷贝的是数组的情况
      //   if (hash.has(source)) return hash.get(source); //判断哈希表（在算法里面把Map和weakMap这种数据类型叫做哈希表）中是否已经存在过当前对象，解决循环引用的时候直接查找哈希表赋值循环的部分
      for (let key in source) {
        //拷贝obj上面存在key
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (this.isObject(source[key])) {
            cloneObj[key] = this.deepClone(source[key]);
          } else {
            cloneObj[key] = source[key];
          }
        }
      }
      return cloneObj;
    },
    deepClone1(source, hash = new WeakMap()) {
      debugger;
      if (!this.isObject(source)) return source;
      let cloneObj = Array.isArray(source) ? [] : {}; //考虑拷贝的是数组的情况
      if (hash.has(source)) return hash.get(source); //判断哈希表（在算法里面把Map和weakMap这种数据类型叫做哈希表）中是否已经存在过当前对象，解决循环引用的时候直接查找哈希表赋值循环的部分
      hash.set(source, cloneObj);
      for (let key in source) {
        //拷贝obj上面存在key
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (this.isObject(source[key])) {
            cloneObj[key] = this.deepClone1(source[key], hash);
          } else {
            cloneObj[key] = source[key];
          }
        }
      }
      return cloneObj;
    },
    cloneDeep3(source, hash = new WeakMap()) {
      debugger;
      if (!this.isObject(source)) return source;
      return this.cloneFunction(source);
      if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

      var target = Array.isArray(source) ? [] : {};
      hash.set(source, target); // 新增代码，哈希表设值

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (this.isObject(source[key])) {
            target[key] = this.cloneDeep3(source[key], hash); // 新增代码，传入哈希表
          } else {
            target[key] = source[key];
          }
        }
      }
      return target;
    },
    cloneFunction(func) {
      debugger;
      const bodyReg = /(?<={)(.|\n)+(?=})/m;
      const paramReg = /(?<=\().+(?=\)\s+{)/;
      const funcString = func.toString(); //
      if (func.prototype) {
        console.log("普通函数");
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
          console.log("匹配到函数体：", body[0]);
          if (param) {
            const paramArr = param[0].split(",");
            console.log("匹配到参数：", paramArr);
            return new Function(...paramArr, body[0]);
          } else {
            return new Function(body[0]);
          }
        } else {
          return null;
        }
      } else {
        // 箭头函数
        return eval(funcString);
      }
    },
  },
};
</script>

<style></style>
