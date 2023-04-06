<template>
  <div class="content">
    <div class="login">
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
        >
          <el-form-item>
            <el-text type="primary" style="padding-top: 50px">
              知乎问答管理系统
            </el-text>
          </el-form-item>
          <el-form-item label="用户名:" prop="name" style="padding-top: 20px">
            <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input
              v-model="ruleForm.email"
              type="email"
              autocomplete="off"
            />
          </el-form-item>

          <el-col>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)"
                >登入</el-button
              >
            </el-form-item>
            <el-form-item>
              没有账号?去
              <el-text class="mx-1" type="success" @click="register()"
                >注册</el-text
              >一个
            </el-form-item>
          </el-col>
        </el-form>
        <el-dialog
          v-model="centerDialogVisible"
          title="注册"
          width="50%"
          center
        >
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="用户名:" prop="name" label-width="70px">
              <el-input
                v-model="ruleForm.name"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="密码:" prop="password" label-width="70px">
              <el-input
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="邮箱:" prop="email" label-width="70px">
              <el-input
                v-model="ruleForm.email"
                type="email"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="centerDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useDataStore } from "../store/index";
const store = useDataStore();
const centerDialogVisible = ref(false);
const ruleFormRef = ref(null);
const ruleForm = reactive({
  name: "guoshengda",
  password: "123456a",
  email: "980070501@qq.com",
});
const rules = reactive({
  name: [
    {
      required: true,
      min: 3,
      max: 10,
      message: "Please input name",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      max: 10,
      min: 6,
      message: "Please input  password",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      trigger: "blur",
    },
  ],
});

const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      store.login(ruleForm);
    } else {
      alert("请填写完整信息");
    }
  });
};

const register = () => {
  centerDialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 370px;

  border: 1px solid rgb(234, 230, 230);
  border-radius: 20px;
  display: flex;
  align-items: center;

  .form {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-text {
      font-size: 30px;
    }
    .el-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
      .mx-1 {
        line-height: 20px;
        font-size: 15px;
        border-bottom: 1px solid rgb(65, 214, 65);
      }
    }
  }
  .el-button {
    width: 100px;
  }
}
.content {
  width: 100%;
  height: 100vh;
  //   background-color: bisque;
}
</style>
