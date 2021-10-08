<template>
  <div>
    <!-- 用原生的写的 -->
    <div class="com-img-box" @click="handleSelectImg">
      <img v-if="showImg" :src="showImg" class="show-img" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <input
      ref="fileInput"
      accept="image/jpeg, image/png"
      @change="handleFileChange"
      type="file"
      style="display: none"
    />
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
    handleFileChange() {
      console.log(this.$refs.fileInput.files);
      const file = this.$refs.fileInput.files[0];

      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size < 1024 * 1024 * 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过2M!");
        return false;
      }
      const _this = this;
      var reader = new FileReader();
      reader.onload = function(event) {
        var image = new Image();
        image.src = event.target.result;
        image.onload = function() {
          if (image.width > 1000 || image.height > 1000) {
            _this.$message.error("上传头像尺寸不对!");
            return false;
          } else {
            _this.handleBatchImg(file);
          }
        };
      };
      reader.readAsDataURL(file);

      //   if (files.length > 0) {
      //     let flag = 0;
      //     for (let i = 0, size = files.length; i < size; i++) {
      //       if (!/(\.jpg|\.png|\.jpeg|\.bmp)$/.test(files[i].name)) {
      //         flag = 1;
      //         break;
      //       } else if (files[i].size > 5 * 1024 * 1024) {
      //         flag = 2;
      //         break;
      //       }
      //     }
      //     if (flag) {
      //       this.$message.error(flag === 1 ? "图片格式不正确" : "图片大小超过5M");
      //       return;
      //     }
      //     if (this.isbatch) {
      //       this.isbatch = false;
      //       this.isbatching = true;
      //       this.handleBatchImg(files);
      //     } else {
      //       this.$refs.faceDialog.handleImg(files);
      //     }
      //   } else {
      //     this.isbatch = false;
      //   }
    },

    /**
     * 处理批量导入的图片
     */
    handleBatchImg(file) {
      //   batchImportImg(files)
      //     .then(() => {
      //       this.$message.success("上传成功");
      //     })
      //     .catch((e) => {
      //       /* if (e.message) this.$message.error(e.message);
      //        else*/
      //       this.$message.error(
      //         e.data && e.data.message ? e.data.message : "上传失败"
      //       );
      //     });
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
    handleSelectImg() {
      this.$refs.fileInput.value = null;
      this.$refs.fileInput.click();
    },
  },
};
</script>

<style>
.com-img-box {
  width: 148px;
  height: 148px;
  text-align: center;
  line-height: 148px;
  border: 1px dotted #ccc;
}
.show-img {
  width: 100%;
  height: 100%;
}
</style>
