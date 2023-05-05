<template>
  <div class="quetionList">
    <el-card class="box-card" v-for="o in 7" :key="o">
      <template #header>
        <div class="card-header">
          <span> 关于环保垃圾如何解决的问题</span>
          <el-button class="button" text>Username</el-button>
        </div>
      </template>
      <span class="deriaction"
        >描述：当下如今我们的环境正在收到破坏我们应该如何解决废弃用品的循环再生，以及污水垃圾乱排放的问题</span
      >
    </el-card>
  </div>
  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentPage = ref(0);
const pageSize = ref(3);
const total = ref(30);
const handleSizeChange = () => {
  console.log("handleSizeChange");
};

const handleCurrentChange = () => {
  console.log("handleCurrentChange");
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  flex-direction: column;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.quetionList {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .box-card {
    margin-top: 50px;
    margin-left: 30px;
    min-width: 100px;
    max-width: 300px;
    .header {
      background-color: antiquewhite;
    }
    .deriaction {
      text-align: left;
      display: block;
    }
  }
}
.demo-pagination-block {
  margin: 20px;
  float: right;
}
</style>
