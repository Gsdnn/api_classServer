import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


export default defineConfig({
  plugins: [vue()],
  //解决“vite use `--host` to expose”
  base: './',	//不加打包后白屏
  server:{
    // port:3001,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:3000',
        changeOrigin:true,
        // ws:true,
        // rewrite:(path)=>path.replace(/^\/api/,"")
      }
    }
  },
  resolve:{   
    //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
    alias:[   
      {
        find:'@',
        replacement:resolve(__dirname,'src') 
      }
    ]
  }
})
