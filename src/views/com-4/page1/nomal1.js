var registerForm = {
  userName: "wangjinyu",
  password: "1222",
  phoneNumber: "156352222",
};
export default onsubmit = function() {
  if (registerForm.userName === "") {
    alert("用户名不能为空");
    return false;
  }
  if (registerForm.password.length < 6) {
    alert("密码长度不能少于 6 位");
    return false;
  }
  if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber)) {
    alert("手机号码格式不正确");
    return false;
  }
};
