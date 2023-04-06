import { defineStore } from "pinia";
import { login as loginApi } from "../api/login";
import router  from '../router';
export const useDataStore = defineStore("useData",{
    state:()=>{
        return {
            token:'',
        menuData:[
            {
              id: '1',
              path: '/CityShow',
              name: 'HomeFilled',
              label: '首页',
              icon: 'HomeFilled',
              url: '/CityShow',
              router: '',
              children: [],
            },
            {
              id: '2',
              path: '/UserFilled',
              name: 'UserFilled',
              label: '用户管理',
              icon: 'UserFilled',
              url: '/UserFilled',
              children: [
                {
                  id: '2-2',
                  path: '/page2',
                  name: 'page2',
                  label: 'page2',
                  url: '/page2',
                  children: [
                    {
                      id: '2-1-1',
                      path: '/page1',
                      name: 'page1',
                      label: 'page1',
                      url: '/page1',
                    },
                  ],
                },
              ],
            },
            {
              id: '3',
              path: '/Management',
              name: 'Management',
              label: '订单管理',
              icon: 'Management',
              url: '/Management',
              children: [],
            }
          ]
        }
    },
    actions:{
        getToken(){
            this.token = localStorage.getItem('token')
        },
        setToken(token){
            localStorage.setItem('token',token)
            this.token = token
        },
        login(userInfo){
            loginApi(userInfo).then(res=>{
                if(res.code == 200){
                   this.setToken(res.authorization.token)
                    router.push({path:'/'})
                }
            }).catch(()=>{
                localStorage.removeItem('token')
            })
        }
    }
})