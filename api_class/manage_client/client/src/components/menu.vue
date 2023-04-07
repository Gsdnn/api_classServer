<template>
  <div>
    <el-menu default-active="2" class="el-menu-vertical-demo" router>
      <template v-for="(item, index) in store.menuData" :key="item.id">
        <el-sub-menu
          :index="item.path"
          v-if="item?.children && item?.children?.length > 0"
        >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item
              :index="children.path"
              v-for="children in item.children"
              :key="children.id"
            >
              <el-icon><component :is="children.icon"></component></el-icon>
              <span>{{ children.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item v-else :index="item?.path">
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.label }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useDataStore } from "../store/index";

const store = useDataStore();
</script>

<style lang="scss" scoped></style>
