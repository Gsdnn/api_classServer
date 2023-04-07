import { defineStore } from "pinia";
import { login as loginApi } from "../api/login";
import router from "../router";
import {
  Document,
  Menu as IconMenu,
  Location,
  User,
  UserFilled,
  Postcard,
} from "@element-plus/icons-vue";
export const useDataStore = defineStore("useData", {
  state: () => {
    return {
      token: "",
      menuData: [
        {
          id: "1",
          path: "/questionList",
          name: "quetion",
          label: "问答列表",
          icon: Document,
          url: "/CityShow",
          router: "",
        },
        {
          id: "2",
          path: "/user",
          name: "User",
          label: "用户管理",
          icon: User,
          url: "/user",
          children: [
            {
              id: "2-1",
              path: "/user/following",
              name: "following",
              label: "粉丝",
              icon: UserFilled,
              url: "/following",
            },
            {
              id: "2-2",
              path: "/user/topicList",
              name: "topicList",
              label: "话题列表",
              icon: IconMenu,
              url: "/topicList",
            },
          ],
        },
        {
          id: "3",
          path: "/topics",
          name: "topics",
          label: "话题管理",
          icon: Postcard,
          url: "/topics",
        },
      ],
    };
  },
  actions: {
    getToken() {
      this.token = localStorage.getItem("token");
    },
    setToken(token) {
      localStorage.setItem("token", token);
      this.token = token;
    },
    login(userInfo) {
      loginApi(userInfo)
        .then((res) => {
          if (res.code == 200) {
            this.setToken(res.authorization.token);
            router.push({ path: "/" });
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    },
  },
});
