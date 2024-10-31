<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <el-container style=" height: 100vh; width: 100% ;border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      
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
  </el-container>
 
</template>

<style scoped>
.logo {
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
}
</style>
