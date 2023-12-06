<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { onMounted,nextTick } from "vue";
import wmdragview from "./components/wmdragview/wmdragview.js";
import VConsole from 'vconsole';

const vConsole = new VConsole();
onMounted(() => {
  const dragview = new wmdragview('#ball', {x:200,y: 200,minY: 0})
    dragview.onClick = function (coord) {
      // console.log(coord);
    }
    dragview.onDrag = function (coord) {
      // console.log(coord);
    }
})

</script>

<template>
  <div class="test-w"> 
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div id="ball" class="ball" style="width:100px;height:100px;background-color:aqua;border-radius:50%;">
  </div>

</template>

<style scoped>
.test-w{
  width: 200px;
  height: 100%;
  background-color: #8e2a2a;
}

</style>
