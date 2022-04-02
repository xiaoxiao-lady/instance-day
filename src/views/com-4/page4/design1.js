const Dialog = (() => {
  const types = {
    info: (content, color) => {
      color = color ? color : "绿色";
      console.log(content, color);
    },
    warning: (content, color) => {
      color = color ? color : "橙色";
      console.log(content, color);
    },
    confirm: (content, color) => {
      color = color ? color : "蓝色";
      console.log(content, color);
    },
  };
  return class {
    constructor(type, content, color) {
      try {
        return types[type](content, color);
      } catch (error) {
        alert("没有");
      }
    }
  };
})();
new Dialog("info", "确定删除么", "red");
