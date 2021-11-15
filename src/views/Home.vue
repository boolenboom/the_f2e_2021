<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <FetchResult />
    <worldMap /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import FetchResult from "@/components/API_Fetch.vue";
// import worldMap from "@/components/Map.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    // FetchResult,
    // worldMap
  },
};
</script>
