<template>
  <div>
    <el-upload
      class="upload"
      :show-file-list="false"
      action=""
      :multiple="false"
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :http-request="handleFileChange"
      :limit="1"
    >
      <el-button class="upload" type="primary">{{ title }}</el-button>
    </el-upload>
    <!-- 导入EXCEL的组件 -->
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
      this.$refs.fileInput.value = null;
      this.$refs.fileInput.click();
    },

    handleFileChange(param) {
      console.log(param);
      const files = param.file;
      let formData = new FormData();
      formData.append("file", param.file);
      console.log(formData);
      //   if (files && files.length > 0) {
      //     if (files.size > 1024 * 1024) {
      //       this.$message.error(
      //         "上传文件的大小超过最大限制1M，请将文件拆解后分次导入!"
      //       );
      //       return;
      //     }
      //     this.importing = true;
      //     const name = files.name;
      //     this.fileName = name;
      //     if (/(\.xls|\.xlsx)$/.test(name)) {
      //       const fileReader = new FileReader();
      //       fileReader.onload = (event) => {
      //         // 读取Excel文件
      //         const fileValue = new Uint8Array(event.target.result);
      //         console.log(fileValue);
      //         this.handleExcel(fileValue);
      //       };
      //       fileReader.readAsArrayBuffer(files);
      //     } else {
      //       this.$message.error("文件格式错误，请确保选择的是Excel文件");
      //       return false;
      //     }
      //   }
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
