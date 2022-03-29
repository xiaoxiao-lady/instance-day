<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>
          {{ item.name }}
        </span>

        <el-button size="mini" @click="handleDelete(index)">删除</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: Object.freeze([
        {
          id: 1,
          name: "列1",
        },
        {
          id: 2,
          name: "列2",
        },
        {
          id: 3,
          name: "列3",
        },
        {
          id: 4,
          name: "列4",
        },
      ]),
    };
  },
  methods: {
    handleDelete(index) {},
  },
  components: {},
};
</script>

<style></style>
