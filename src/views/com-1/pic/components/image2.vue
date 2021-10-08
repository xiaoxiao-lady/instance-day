<template>
  <div>
    <!-- 用ui组件的调用接口写的 -->
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :http-request="handleAvatarUpload"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="showImg" :src="showImg" class="show-img" />
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["defaultImage"],
  data() {
    return {
      showImg: "",
    };
  },
  watch: {
    defaultImage: {
      immediate: true,
      handler(val) {
        this.showImg = val;
      },
    },
  },
  methods: {
    handleAvatarUpload(params) {
      const { file } = params;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("medicalId", "3"); //传别的参数
      axios({
        url: "/api/upload",
        method: "post",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        data: formData,
      }).then((res) => {
        this.$message.success("上传成功");
        this.showImg = res.path || URL.createObjectURL(file);
      });
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 < 150;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 150KB!");
        return false;
      }
      var _this = this;
      //   预览功能，这个就是可以没有上传也能看到图片的大小信息，可以写也可以直接用后端返回的地址
      return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var image = new Image();
          image.onload = function() {
            if (image.width > 1000 || image.height > 1000) {
              _this.$alert("图片大小不对", "提示", {
                confirmButtonText: "确定",
              });
              reject();
            }
            resolve();
          };
          image.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
  },
  mounted() {
    axios({
      url: "/api/a",
      method: "post",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.upload-img {
  position: absolute;
  width: 148px;
  height: 148px;
}
.deleteIcon {
  position: absolute;
  z-index: 999;
  top: -10px;
  right: -10px;
  cursor: pointer;
}
.show-img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
