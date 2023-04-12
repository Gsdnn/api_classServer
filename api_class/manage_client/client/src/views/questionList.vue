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
</template>

<script setup></script>

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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .box-card {
    margin-top: 50px;
    margin-left: 30px;
    width: 400px;
    .header {
      background-color: antiquewhite;
    }
    .deriaction {
      text-align: left;
      display: block;
    }
  }
}
</style>
