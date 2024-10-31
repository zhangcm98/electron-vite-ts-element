<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>
<template>
  <!-- <el-container style="height: 100vh; width: 100% ;border: 1px solid #eee">
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
    </el-aside>
      <el-main>
        <div>
          <a href="https://electron-vite.github.io" target="_blank">
              <img src="/electron-vite.svg" class="logo" alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
          </a>
        </div>
        <HelloWorld msg="Vite + Vue" />
        fileName: <input id="fileName"/>
        <button id="btn" type="button">Set</button>
        <div id="progress-bar">
          <div id="progress"></div>
        </div>
      </el-main>
  </el-container> -->
  <div class="parent-container">
    <el-container style="height: 100vh; width: 100%">
      <el-aside style="background-color: #d3dce6;width: 37%;">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">选择文件</el-button>
          </div>
          <div class="text item">卡片详情介绍</div>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">卡片详情介绍</div>
        </el-card>
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">卡片详情介绍</div>
        </el-card>
      </el-aside>
      <el-main style="background-color: #e9eef3">Main 内容区域</el-main>
    </el-container>
  </div>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#progress-bar {
  width: 200px;
  height: 20px;
  background-color: #eee;
}

#progress {
  height: 100%;
  background-color: #4CAF50;
  width: 0%;
} */
.parent-container {
     display: flex;
     flex-direction: column;
     height: 100vh;
     width: 100%;
}
el-container {
     flex: 1;
}
.text {
    font-size: 14px;
  }

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 90%;
    margin-left: 5%;
    margin-top: 3%;
}
</style>
