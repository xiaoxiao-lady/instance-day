const EventEmit = function() {
  this.events = {};
  this.on = function(name, cb) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(cb);
  };
  this.emit = function(name, ...arg) {
    if (this.events[name]) {
      this.events[name].forEach((eventListener) => {
        eventListener(...arg);
      });
    }
  };
};

const eventEmit = new EventEmit();

eventEmit.on("buy", (name) => {
  console.log("我要房子" + name);
}); // 订阅者
eventEmit.on("buy", (name) => {
  console.log("喜欢吃" + name);
}); // 订阅者

eventEmit.emit("buy", "1号"); //发布者
