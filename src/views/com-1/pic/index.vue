<template>
  <div>
    <h2>elementUI的action单图片</h2>
    <Upload :defaultImage.sync="image"> </Upload>
    <h2>elementUI的自定义单图片上传</h2>
    <Upload2 :defaultImage.sync="image"> </Upload2>
    <h2>原生单图片上传</h2>
    <Upload1 :defaultImage.sync="image"> </Upload1>
    <el-button @click="handleCancal" style="margin-top:10px">重置</el-button>
    <h2>原生多图片上传</h2>
    <Upload3 :defaultImage.sync="image"> </Upload3>
  </div>
</template>

<script>
import Upload from "./components/image";
import Upload1 from "./components/image1";
import Upload2 from "./components/image2";
import Upload3 from "./components/image3";

export default {
  data() {
    return {
      image: "",
    };
  },
  components: {
    Upload,
    Upload1,
    Upload2,
    Upload3,
  },
  watch: {
    image(val) {
      console.log(val);
    },
  },
  methods: {
    handleCancal() {
      this.image = "";
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
