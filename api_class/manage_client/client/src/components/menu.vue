<template>
  <template v-for="(item, index) in menuList" :key="index">
    <!-- 如果当前菜单有下级,循环下级 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="item.id"
    >
      <template #title>
        <el-icon class="menu-icon">
          <!-- 遍历icon -->
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item?.label }}</span>
      </template>

      <!-- 递归调用自身 -->
      <Menu :menuList="item.children" :index="item.id"> </Menu>
    </el-sub-menu>

    <!-- 没有下级 -->
    <el-menu-item v-else :index="item?.id">
      <component :is="item?.icon" class="menu-icon"></component>
      <template #title>{{ item?.label }}</template>
    </el-menu-item>
  </template>
</template>

<script setup>
// import { defineComponent, onMounted } from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import Menu from "./menu.vue";
const props = defineProps({
  menuList: {
    type: Array,
    default: "",
  },
});
// export default defineComponent({
//   name: 'MenuItem',
//   props: ['menuList'],

//   components: {
//     Location,
//     Setting,
//     IconMenu,
//     Document,
//     Management,
//     HomeFilled,
//     UserFilled,
//   },
// });
//
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu-icon {
  width: 24px;
  height: 24px;
}
</style>
