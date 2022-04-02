// 数据格式不一致的问题
// 需要对原有的数据格式进行包装，处理为能够正常使用的格式
// 需要的格式如下
const res = {
  code: 0, // 业务 code
  msg: "", // 出错时候的提示
  data: {
    total: 0, // 总数量
    list: [], // 表格列表
  },
};
// 后端返回的格式如下：
const res1 = {
  code: 0, // 业务 code
  message: "", // 出错时候的提示
  data: {
    total: 0, // 总数量
    records: [], // 表格列表
  },
};

function formatResponse(res) {
  return {
    ...res,
    msg: res.message,
    data: {
      ...res.data,
      list: res?.data?.records || [],
    },
  };
}

console.log("response", formatResponse(res1));
