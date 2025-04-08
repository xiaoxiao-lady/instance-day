export const isFun = (val) => {
  Object.prototype.toString.call(val) == "[object Function]";
};
