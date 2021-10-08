<template>
  <div>
    <!-- 导入EXCEL的组件 -->
    <el-button
      class="upload"
      type="primary"
      :loading="importing"
      @click="handlerUpload"
      >{{ title }}</el-button
    >
    <input
      ref="fileInput"
      :accept="accept"
      value="选择文件"
      onchange="handleFileChange(this)"
      type="file"
    />
  </div>
</template>
<script>
import XLSX from "xlsx";

export default {
  props: {
    title: {
      type: String,
      default: "导入",
    },
    accept: {
      type: String,
      default:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    },
  },
  data() {
    return {
      fileName: "",
      importing: false,
    };
  },
  watch: {},
  methods: {
    handlerUpload() {
      //   this.$refs.fileInput.value = "";
      this.$refs.fileInput.click();
      this.importing = true;
    },
    handleFileChange(obj) {
      console.log(obj);
      var nf = obj.cloneNode(true);
      nf.value = ""; // 设计新控件value为空
      obj.parentNode.replaceChild(nf, obj);

      const files = this.$refs.fileInput.files;
      if (files && files.length > 0) {
        if (files[0].size > 1024 * 1024) {
          this.$message.error(
            "上传文件的大小超过最大限制1M，请将文件拆解后分次导入!"
          );
          return;
        }
        const name = files[0].name;
        this.fileName = name;
        if (/(\.xls|\.xlsx)$/.test(name)) {
          const fileReader = new FileReader();
          fileReader.onload = (event) => {
            // 读取Excel文件
            const fileValue = new Uint8Array(event.target.result);
            console.log(fileValue);
            // this.handleExcel(fileValue);
          };
          fileReader.readAsArrayBuffer(files[0]);
        } else {
          this.$message.error("文件格式错误，请确保选择的是Excel文件");
          return false;
        }
      } else {
        this.importing = false;
      }
    },
    // 读取excel
    handleExcel(value) {
      try {
        const xlsxDate = XLSX.read(value, { type: "buffer" });
        if (!xlsxDate.Workbook) {
          this.importing = false;
          this.$message.error("导入失败，解析Excel文件失败");
          return;
        }
        // 解析Excel内容，并发送到后端
        const result = XLSX.utils.sheet_to_row_object_array(
          xlsxDate.Sheets[xlsxDate.SheetNames[0]]
        );
        console.log(result);
        this.$emit("reflush", result);
      } catch (e) {
        this.importing = false;
        this.$message.error("解析文件失败");
      }
    },
  },
};
</script>
<style scoped>
.hide {
  display: none;
}
</style>
