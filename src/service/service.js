import { urlGet, postJSON } from "./clientAjax";

const api = {
  // 用户权限
  getAuthList: params => urlGet("/sys/permission/menu", params),
  // 登录







};
export default api;
