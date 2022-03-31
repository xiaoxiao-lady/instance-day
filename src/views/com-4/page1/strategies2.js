// 这类案例还可以联想到我们vue的filters的时候时常用v-if,也可以换成对象这种的策略模式
var strategies = {
  S: function(salary) {
    return salary * 4;
  },
  A: function(salary) {
    return salary * 3;
  },
  B: function(salary) {
    return salary * 2;
  },
};

const calculateBonus = function(level, salary) {
  return strategies[level](salary) || 0;
};
export default calculateBonus;
