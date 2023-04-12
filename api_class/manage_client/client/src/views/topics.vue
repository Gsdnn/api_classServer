<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span style="flex: 1">可燃垃圾</span>
        <el-button class="button" type="primary">编辑</el-button>
        <el-button class="button" type="">删除</el-button>
      </div>
    </template>
    <div>描述</div>
    <div>
      法律上确实写着最严重的时候处于5年以下监禁或1000w日元以下罚款，或者兼有。但是现实生活中，除非恶劣到一定程度的连续违反，不然很难有如此严厉的处罚。一般情况下，罚款都很难出现。
    </div>
  </el-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.box-card {
  height: 300px;
  width: 300px;
  .card-header {
    display: flex;
    align-items: center;
  }
}
</style>
