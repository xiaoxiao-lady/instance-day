<template>
  <el-table
    :data="tableData"
    height="550"
    style="width: 100%"
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column
      header-align="center"
      align="center"
      prop="name"
      label="通用语名"
    >
    </el-table-column>
    <el-table-column label="批准文号" prop="floorValue">
      <template slot-scope="scope">
        <div>{{ scope.row.buildInfo }}</div>
        <div
          v-if="scope.row.BuildingsOptions && scope.row.BuildingsOptions.length"
        >
          <el-select
            v-model="scope.row.buildValue"
            placeholder="请选择"
            @change="
              (value) => {
                CheckedBuildings(value, scope.row);
              }
            "
          >
            <el-option
              v-for="item in scope.row.BuildingsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <!-- 分割线
          <el-divider></el-divider>
          <el-checkbox
            :indeterminate="isIndeterminate"
            class="allselect"
            v-model="checkAll"
            @change="CheckAllChange(scope.$index)"
            >全选</el-checkbox
          > -->
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生产厂家" prop="floorValue">
      <template slot-scope="scope">
        <div>
          {{ scope.row.floorInfo }}
        </div>
        <div v-if="!scope.row.floorInfo">
          <el-select
            v-model="scope.row.floorValue"
            placeholder="请选择"
            @change="
              (value) => {
                CheckedFloorings(value, scope.row);
              }
            "
          >
            <el-option
              v-for="item in scope.row.FloorsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <!-- 分割线
          <el-divider></el-divider>
          <el-checkbox
            :indeterminate="isIndeterminate"
            class="allselect"
            v-model="checkAll"
            @change="CheckAllChange(scope.$index)"
            >全选</el-checkbox
          > -->
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="规格" prop="floorValue">
      <template slot-scope="scope">
        <div>{{ scope.row.areaInfo }}</div>
        <div v-if="!scope.row.areaInfo">
          <el-select
            v-model="scope.row.areaValue"
            placeholder="请选择"
            @change="
              (value) => {
                CheckedAreaings(value, scope.row);
              }
            "
          >
            <el-option
              v-for="item in scope.row.areasOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
            <!-- 分割线
          <el-divider></el-divider>
          <el-checkbox
            :indeterminate="isIndeterminate"
            class="allselect"
            v-model="checkAll"
            @change="CheckAllChange(scope.$index)"
            >全选</el-checkbox
          > -->
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="微医ICD编码-微医疾病" prop="floorValue">
      <template slot-scope="scope">
        <div v-if="scope.row.diseaseCode">
          12313213-高血压
        </div>
        <div v-else @click="handleInputShow(scope.row)">
          <span v-if="!scope.row.inputVisible">——</span>
          <div>
            <el-autocomplete
              v-if="scope.row.inputVisible"
              size="small"
              clearable
              v-model="scope.row.diseaseCode1"
              :fetch-suggestions="handleSearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="关联状态" prop="relationStatus">
      <template slot-scope="scope"
        >{{ scope.row.relationStatus == 1 ? "已关联" : "未关联" }}
      </template>
    </el-table-column>
    <el-table-column label="拒绝状态" prop="rejectStatus">
      <template slot-scope="scope"
        >{{ scope.row.rejectStatus == 1 ? "已拒绝" : "未拒绝" }}
      </template>
    </el-table-column>
    <el-table-column label="剂量单位换算" prop="floorValue" width="400px">
      <template slot-scope="scope">
        <li class="flexAround">
          <span>医院</span>
          <span>公司</span>
          <span>系数</span>
        </li>
        <li
          v-for="(item, index) in scope.row.conversionRange"
          :key="index"
          class="flexAround"
        >
          <el-input
            class="inputStyle"
            size="small"
            v-model="item.hospital"
            clearable
          >
          </el-input>
          <el-select
            v-model="item.company"
            placeholder="请选择"
            @change="
              (value) => {
                CheckedAreaings(value, scope.row);
              }
            "
          >
            <el-option
              v-for="range in item.companyList"
              :key="range.value"
              :label="range.label"
              :value="range.value"
            ></el-option>
          </el-select>
          <el-input
            class="inputStyle"
            size="small"
            v-model="item.xishu"
            clearable
          >
          </el-input>
          <i
            class="el-icon-circle-plus-outline"
            size="24"
            @click="handleAdd(scope.row)"
          ></i>
          <i
            size="24px"
            class="el-icon-remove-outline"
            v-if="
              scope.row.conversionRange && scope.row.conversionRange.length > 1
            "
            @click="handleDelete(scope.row, index)"
          ></i>
        </li>
      </template>
    </el-table-column>
    <el-table-column label="剂量单位换算" prop="floorValue" width="400px">
      <template slot-scope="scope">
        <div v-if="scope.row.matchStatus == 1">
          <el-button
            size="small"
            type="text"
            v-if="scope.row.relationStatus != 1 && scope.row.rejectStatus != 1"
            @click="handleConfirm(scope.row)"
            >确认关联</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleConfirm(scope.row)"
            v-if="scope.row.relationStatus == 1"
            >取消关联</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleConfirm(scope.row)"
            v-if="scope.row.relationStatus != 1 && scope.row.rejectStatus != 1"
            >拒绝</el-button
          >
          <el-button
            size="small"
            type="text"
            @click="handleConfirm(scope.row)"
            v-if="scope.row.relationStatus != 1 && scope.row.rejectStatus == 1"
            >取消拒绝</el-button
          >
        </div>
        <div v-else>——</div>

        <!-- matchStatus: 1, // 匹配状态 relationStatus: 1, //关联状态
        rejectStatus:1, //拒绝状态 -->
        <!-- 1表示为真，0表示为假 -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "distributeDept",
  data() {
    return {
      selectBuilding: "", //单元格-选择的楼栋
      // selectfloorValue: [], //单元格-楼层范围
      // selectUnitScope: [], //单元格-单元范围
      checkAll: false, //全选
      isIndeterminate: false,
      //   楼栋选择
      selectOptions: [
        {
          value: "选项1",
          floorList: [
            {
              value: "选项1",
              label: "安徽药业1",
            },
            {
              value: "选项2",
              label: "安徽药业2",
            },
            {
              value: "选项3",
              label: "安徽药业3",
            },
          ],
        },
        {
          value: "选项2",
          floorList: [
            {
              value: "选项1",
              label: "河南药业1",
            },
            {
              value: "选项2",
              label: "河南药业2",
            },
            {
              value: "选项3",
              label: "河南药业3",
            },
          ],
        },
        {
          value: "选项3",
          floorList: [
            {
              value: "选项1",
              label: "山西药业1",
            },
            {
              value: "选项2",
              label: "山西药业2",
            },
            {
              value: "选项3",
              label: "山西药业3",
            },
          ],
        },
      ],
      standardsOptions: [
        {
          value: "选项1",
          list: [
            {
              value: "选项1",
              label: "100mg*30片",
            },
            {
              value: "选项2",
              label: "100mg*31片",
            },
            {
              value: "选项3",
              label: "100mg*32片",
            },
          ],
        },
        {
          value: "选项2",
          list: [
            {
              value: "选项1",
              label: "200mg*30片",
            },
            {
              value: "选项2",
              label: "200mg*31片",
            },
            {
              value: "选项3",
              label: "200mg*32片",
            },
          ],
        },
        {
          value: "选项3",
          list: [
            {
              value: "选项1",
              label: "300mg*31片",
            },
            {
              value: "选项2",
              label: "300mg*32片",
            },
            {
              value: "选项3",
              label: "300mg*33片",
            },
          ],
        },
      ],
      tableData: [
        //表格数据
        {
          name: "银信叶片1", //楼栋
          buildInfo: "H123",

          BuildingsOptions: [
            {
              value: "选项1",
              label: "H100",
            },
            {
              value: "选项2",
              label: "H101",
            },
            {
              value: "选项3",
              label: "H102",
            },
          ],
          buildValue: "",
          floorInfo: "",
          floorValue: [], //楼层范围
          FloorsOptions: [],
          areaValue: "",
          areasOptions: [],
          unitScope: [], //单元范围
          conversionRange: [
            {
              hospital: "",
              company: "",
              companyList: [
                {
                  value: "片",
                  label: "片",
                },
                {
                  value: "mg",
                  label: "mg",
                },
              ],
              xishu: "",
            },
          ],
          matchStatus: 1, // 匹配状态
          relationStatus: 1, //关联状态
          rejectStatus: 1, //拒绝状态
        },
        {
          name: "银信叶片3",
          buildInfo: "H300",
          BuildingsOptions: [],
          buildValue: "",
          floorInfo: "",
          FloorsOptions: [
            {
              value: "选项1",
              label: "山西药业1",
            },
            {
              value: "选项2",
              label: "山西药业2",
            },
            {
              value: "选项3",
              label: "山西药业3",
            },
          ],
          conversionRange: [
            {
              hospital: "",
              company: "",
              companyList: [
                {
                  value: "片",
                  label: "片",
                },
                {
                  value: "mg",
                  label: "mg",
                },
              ],
              xishu: "",
            },
          ],
          floorValue: [], //楼层范围
          areaValue: "",
          areasOptions: [],
          unitScope: [], //单元范围
          matchStatus: 1, // 匹配状态
          relationStatus: 0, //关联状态
          rejectStatus: 1, //拒绝状态
        },
        {
          name: "银信叶片2",
          buildInfo: "H123",
          BuildingsOptions: [],
          buildValue: "",
          floorInfo: "山西药业1",
          FloorsOptions: [],
          floorValue: [], //楼层范围
          areaValue: "",
          areasOptions: [
            {
              value: "选项1",
              label: "300mg*31片",
            },
            {
              value: "选项2",
              label: "300mg*32片",
            },
            {
              value: "选项3",
              label: "300mg*33片",
            },
          ],
          unitScope: [], //单元范围
          matchStatus: 1, // 匹配状态
          relationStatus: 0, //关联状态
          rejectStatus: 0, //拒绝状态
        },

        {
          name: "银信叶片3",
          buildInfo: "H300",
          BuildingsOptions: [],
          buildValue: "",
          floorInfo: "山西药业2",
          FloorsOptions: [],
          floorValue: [], //楼层范围
          areaValue: "",
          areasOptions: [],
          areaInfo: "300mg*33片",
          unitScope: [], //单元范围
          matchStatus: 0, // 匹配状态
        },
      ],
    };
  },

  created() {},
  mounted() {},
  computed: {},
  methods: {
    // 楼层范围全选
    CheckAllChange(index) {
      if (this.checkAll) {
        let array = [];
        this.FloorsOptions.forEach((v) => {
          array.push(v.value);
        });
        this.tableData[index].floorValue = array;
      } else {
        this.tableData[index].floorValue = [];
      }
      this.isIndeterminate = false;
    },
    CheckedBuildings(value, row) {
      let res = this.selectOptions.filter((ele) => {
        return ele.value == value;
      });
      if (res && res.length) this.$set(row, "FloorsOptions", res[0].floorList);
      //   获取数据，实际的使用中就是调用接口的方式
    },
    CheckedFloorings(value, row) {
      this.$set(row, "floorValue", value);
      let res = this.standardsOptions.filter((ele) => {
        return ele.value == value;
      });
      if (res && res.length) this.$set(row, "areasOptions", res[0].list);
    },
    CheckedAreaings(value, row) {
      this.$set(row, "areaValue", value);
    },
    handleConfirm(row) {
      console.log(row);
    },
    handleAdd(row) {
      row.conversionRange.push({
        hospital: "",
        company: "",
        companyList: [
          {
            value: "片",
            label: "片",
          },
          {
            value: "mg",
            label: "mg",
          },
        ],
        xishu: "",
      });
      //   this.$set(row, "conversionRange", row.conversionRange);
    },
    handleDelete(row, index) {
      row.conversionRange.splice(index, 1);
    },
    handleSearchAsync(queryString, cb) {
      console.log(queryString);

      let res = [
        { value: "12313213-高血压1" },
        { value: "12313213-高血压2" },
        { value: "12313213-高血压3" },
      ];
      setTimeout(() => {
        cb(res);
      }, 100);
    },
    handleSelect(item) {
      console.log(item);
    },
    handleInputShow(row) {
      if (
        row.matchStatus == 1 &&
        row.relationStatus != 1 &&
        row.rejectStatus != 1
      ) {
        this.$set(row, "inputVisible", true);
      } else {
        this.$set(row, "inputVisible", false);
      }
    },
  },
};
</script>

<style scoped>
.flexAround {
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.inputStyle {
  width: 70px;
  margin: 0 10px;
}
</style>
