<template style="height: 100%;">
  <div id="whole">
    <div id="nav">
      <Navbar :key="$route.fullPath"></Navbar>
    </div>

    <div id="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
#whole {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: absolute;
}

#nav {
  top: 0;
  height: 100.8px;
  position: relative;
  z-index: 1;
}

#container {
  position: relative;
}
</style>

<script>
import Navbar from "./components/GlobalComponents/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>
