<template>
  <div class="common-layout">
    <el-container>
      <el-header width="100%"><h2>知乎问答系统</h2></el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              unique-opened
            >
              <Menu :menuList="store.menuData" />
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-main><router-view /></el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import Menu from "../components/menu.vue";
import { useDataStore } from "../store/index";
const store = useDataStore();
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  .el-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-main {
    background-color: red;
  }
}
body {
  margin: 0;
  padding: 0;
}
</style>
