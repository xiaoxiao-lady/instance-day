<template>
  <div>
    <!-- <el-button type="primary" @click="handleAdd">新增</el-button> -->
    <!-- <virtual-scroller
      :items="tableData"
      item-height="40"
      content-tag="el-table"
    >
      <el-table border :data="tableData" height="500px">
        <el-table-column prop="index" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </virtual-scroller> -->
    <u-table
      ref="plTable"
      :height="400"
      row-key="id"
      :data="tableData"
      use-virtual
      :disabled="disabled"
      :big-data-checkbox="true"
      showBodyOverflow="title"
      showHeaderOverflow="title"
      :row-height="50"
      border
    >
      <!-- :selectable="selectable" -->
      <u-table-column type="selection" width="55" />
      <u-table-column type="index" width="100" fixed />
      <u-table-column label="地址" prop="address" />
      <u-table-column label="姓名" prop="ab" />
      <u-table-column label="地址" prop="address" />
      <u-table-column label="姓名" prop="ab" />
      <u-table-column label="地址" prop="address" />
      <u-table-column label="姓名" prop="ab" />
      <u-table-column label="地址" prop="address" />
      <u-table-column label="姓名" prop="ab" />
    </u-table>
  </div>
</template>

<script>
import { UTable, UTableColumn } from "umy-ui";
import { Message } from "element-ui";

export default {
  data() {
    return {
      tableData: [],
      allData: [],
      number: 30,
      disabled: [],
    };
  },
  components: {
    UTable,
    UTableColumn,
  },
  mounted() {
    const data = Array.from({ length: 10000 }, (_, idx) => ({
      id: idx + 1,
      date: "2016-05-03",
      name: 1,
      ab: "欢迎使用u-table",
      address: "北京市天安门",
    }));
    this.tableData = data;

    // 设置表格数据
    this.disabled = data.slice(3, 5);
    // this.$refs.plTable.reloadData(data);
  },
  methods: {},
};
</script>

<style></style>
