<template>
  <div>
    <h1>hello world</h1>
    <router-link to="/b">这是组件B</router-link>
    <router-link to="/">这是组件A</router-link>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import url from "./assets/a.jpg";
export default {
  name: "App",
  data: function() {
    return {
      msg: "Hello World",
      url: url
    };
  }
};
</script>

<style lang="sass">
h1 {
  color: red;
    }
    img{
  witht: 100px;
  height: 100px;
    }
</style>
