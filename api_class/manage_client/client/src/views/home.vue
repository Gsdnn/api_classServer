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
              <Menu />
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-container>
          <el-main>
            <el-tabs
              :modelValue="editableTabsValue"
              type="card"
              closable="true"
              class="demo-tabs"
              @edit="handleTabsEdit"
              @tab-click="handeltabs"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.name"
                :name="item.path"
              >
              </el-tab-pane>
            </el-tabs>

            <router-view />
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import Menu from "../components/menu.vue";
import { useDataStore } from "../store/index";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const store = useDataStore();
const router = useRouter();
const editableTabsValue = ref("");
const inputVisible = ref(false);
const editableTabs = ref(store.breadcrumbList);
const handleTabsEdit = (action) => {
  // console.log("删除", action);
  store.removeBreadcrumb(action);
};
const handeltabs = (action) => {
  // console.log("点击", action.paneName);
  router.push({ path: action.paneName });
};
editableTabsValue.value = computed(() => {
  // console.log("store.currentPath", store.currentPath);
  return store.currentPath;
});
onMounted(() => {});
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
    .tag .el-tag {
      margin-left: 10px;
      margin-top: -20px;
    }
  }
}
body {
  margin: 0;
  padding: 0;
}
</style>
